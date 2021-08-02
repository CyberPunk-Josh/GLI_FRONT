import  { basePath, apiVersion } from './config';

// get all courses
export function getCoursesApi(token){
    const url = `${basePath}/${apiVersion}/courses`;

    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

// function to deletea course
export function deleteCourse(token, courseId) {
    const url = `${basePath}/${apiVersion}/delete-course/${courseId}`;

    const params = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}

// function to edit a course
export function updateCourse(token, course, courseId) {
    const url = `${basePath}/${apiVersion}/update-course/${courseId}`;

    const params = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(course)
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(resutl => {
        return resutl;
    }).catch(err => {
        return err.message;
    })
}

// function to create a course
export function createCourse(token, data){
    const url = `${basePath}/${apiVersion}/create-course`;

    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
            Authorization: token,
        }

    }

    return fetch(url, params).then((response) => {
        return response.json();
    }).then(result => {
        // console.log(result);
        // si el resultado es correcto:
        if (result.message === 'Course created successfully'){
            return {
                ok: true,
                message: 'Course has been created successfully!'
            }
        } else{
            return{
                ok: false,
                message: result.message
            }
        }
    })
    .catch((error) => {
        return {
            ok: false,
            message: error.message
        }
    })

}
