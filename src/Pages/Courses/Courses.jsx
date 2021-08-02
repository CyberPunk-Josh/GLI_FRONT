import React, { useState, useEffect } from 'react'
import { getAcessToken } from '../../api/auth';
import { getCoursesApi } from '../../api/course';
import ListCourses from '../../Components/ListCourses';
import { Button, Input, Form } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import CreateCourse from '../../Components/CreateCourse/CreateCourse';
import Modal from '../../Components/Modal/Modal';

// importing SASS file
import './Courses.scss';

const Courses = () => {
    const token = getAcessToken();

    const [courses, setCourses] = useState([]);
    const [reloadCourses, setReloadCourses] = useState(false);

    // state for modal:
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);


    useEffect(() => {
        getCoursesApi(token).then(response => {
            setCourses(response.users);
        });

        setReloadCourses(false);
    }, [token, setCourses, reloadCourses]);

    // function to create a course
    const crearteCourse = () => {
        setIsVisibleModal(true);
        setModalTitle("Create a new Course");
        setModalContent(<CreateCourse setIsVisibleModal={setIsVisibleModal} setReloadCourses={setReloadCourses} />);

    }

    return(
        <div className="courses">
            <div className="courses__info">
                <h4>{'Inicio > Cursos'}</h4>
                <h5>Cursos y capacitación</h5>
            </div>
            <div className="courses_bar">
                <div className="courses__form">
                    <Form className="form_search" >
                        <Input 
                            prefix={<SearchOutlined style={{ color: 'rgba(0,0,.25)'}} />}
                            type="email"
                            name="email"
                            placeholder="Buscar"
                        />
                        <Button className="form_search__button">
                            Buscar
                        </Button>
                        <FilterOutlined className="form_search__filter"/>
                    </Form>
                </div>
                <div className="courses__buttons">
                    <Button className="downloadCourse">
                        Descargar
                    </Button>
                    <Button onClick={ () => crearteCourse() } className={'createCourse'}>
                        Crear Curso
                    </Button>
            </div>
            </div>
            <ListCourses
                courses={courses}
                setReloadCourses={setReloadCourses}
            />

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}
 
export default Courses;