import React, {useState} from 'react';
import { List, Modal as ModalAntd, notification } from 'antd';
import {EditTwoTone, DeleteTwoTone, EyeOutlined} from '@ant-design/icons';
import { deleteCourse } from '../../api/course';
import { getAcessToken } from '../../api/auth';
import EditCourseForm from '../EditCourseForm/EditCourseForm';
import Modal from '../Modal/Modal';

const { confirm } = ModalAntd;

const ListCourses = (props) => {
    const {courses, setReloadCourses } = props;

    // state for modal:
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const editCourses = courses => {
        setIsVisibleModal(true);
        setModalTitle(`Edit ${courses.name} ${courses.content }`);
        setModalContent(<EditCourseForm courses={courses} setIsVisibleModal={setIsVisibleModal} setReloadCourses={setReloadCourses} />);
    }


    return ( 
        <>
            <List
                className="users-active"
                itemLayout='horizontal'
                dataSource={courses}
                renderItem={ course => 
                    <ListOfCourses course={course} setReloadCourses={setReloadCourses} editCourses={editCourses}/>
                }
            />

            <Modal
                    title={modalTitle}
                    isVisible={isVisibleModal}
                    setIsVisible={setIsVisibleModal}
                >
                    {modalContent}
                </Modal>
        </>
     );
}

function ListOfCourses(props) {
    const { course, setReloadCourses, editCourses } = props;


    const showDeleteConfirm = () => {
        const token = getAcessToken();

        confirm({
            title: 'Delete a course',
            content:`Are you sure you want to delete ${course.name}?`, 
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                deleteCourse(token, course._id)
                    .then(response => {
                        notification['success']({
                            message: response
                        })
                        setReloadCourses(true);
                    })
                    .catch(error => {
                        notification['error']({
                            message: error
                        })
                    })
            }
        })
    }

    return (
        <List.Item
            actions={[
                <EditTwoTone onClick={ () => editCourses(course)} />,
                <DeleteTwoTone onClick={ showDeleteConfirm } twoToneColor="#eb2f96" />,
                <EyeOutlined />
            ]}
        >
            <List.Item.Meta
                title= 'Course Name'
                description={course.name}
            />
            <List.Item.Meta
                title= 'Content'
                description={course.content}
            />
            <List.Item.Meta
                title= 'Modules'
                description={course.modules}
            />
            <List.Item.Meta
                title= 'Difficulty'
                description={course.difficulty}
            />
            <List.Item.Meta
                title= 'Status'
                description={course.active}
            />
        </List.Item>
    )
}
 
export default ListCourses;