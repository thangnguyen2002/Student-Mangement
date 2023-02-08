const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const save = () =>{
    let fullname = document.getElementById('fullname').value
    let email = document.getElementById('email').value
    let phoneNum = document.getElementById('phoneNum').value
    let address = document.getElementById('address').value
    let gender = ''
    if (document.getElementById('male').checked){
        gender = document.getElementById('male').value
    } else if (document.getElementById('female').checked){
        gender = document.getElementById('female').value
    }
    // console.log(fullname, email, phoneNum, address, gender)

    // if (_.isEmpty(fullname)){
    //     console.log('Please fill ur name')
    // }
    //trim() bỏ khoảng trắng đầu và cuối của câu, 
    // => khi nhập 1 từ cách cách.. thì input text sẽ ko hiểu vì đã bị bỏ khoảng trống đầu cuối, trừ khi nhập chữ or số,... mới khả dụng
    if (_.isEmpty(fullname)){
        document.getElementById('name-error').innerHTML = 'Please fill name!!' 
    } else if (fullname.trim().length <= 2){
        fullname = '' //coi nhu ko pass qua dkien if at line 62 de luu vao danh sach sinh vien storage
        document.getElementById('name-error').innerHTML = 'More than 2 word'
    } else if (fullname.trim().length > 50){
        fullname = ''
        document.getElementById('name-error').innerHTML = 'Less than 50 word'
    } else {
        document.getElementById('name-error').innerHTML = ''
    }

    if (_.isEmpty(email)){
        document.getElementById('email-error').innerHTML = 'Please fill email!!'
    } else if (!validEmail(email)){
        email = ''
        document.getElementById('email-error').innerHTML = 'Incorrect email form'
    } else {
        document.getElementById('email-error').innerHTML = ''
    }

    if (_.isEmpty(phoneNum)){
        document.getElementById('phoneNum-error').innerHTML = 'Please fill number!!'
    } else if (phoneNum.trim().length > 10 || phoneNum.trim().length < 10){
        phoneNum = ''
        document.getElementById('phoneNum-error').innerHTML = 'Incorrect number'
    } else {
        document.getElementById('phoneNum-error').innerHTML = ''
    }

    if (_.isEmpty(address)){
        document.getElementById('address-error').innerHTML = 'Please fill address!!'
    } else {
        document.getElementById('address-error').innerHTML = ''
    }

    if (_.isEmpty(gender)){
        document.getElementById('gender-error').innerHTML = 'Please check gender!!'
    } else {
        document.getElementById('gender-error').innerHTML = ''
    }
    //Luu danh sach sinh vien
    if (fullname && email && phoneNum && address && gender){
        // console.log(fullname, email, phoneNum, address, gender)
        // let student = {
        //     fullname: fullname,
        //     email: email,
        //     phoneNum: phoneNum,
        //     address: address,
        //     gender: gender
        // }
        // console.log(student)

        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
        students.push({
            fullname: fullname,
            email: email,
            phoneNum: phoneNum,
            address: address,
            gender: gender
        })
        localStorage.setItem('students', JSON.stringify(students))
        renderListStudent()
    
    }
}
                        // ('key', 'value')
// localStorage.setItem('student', 'Duc Thang') //setItem chi set kieu String
// console.log(localStorage.getItem('student'))
const renderListStudent = () =>{
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

    if(students.length === 0){
        document.getElementById('list-student').style.display = 'none'
        return false
    }
    document.getElementById('list-student').style.display = 'block'
    let tableContent = `
        <tr>
            <td>STT</td>
            <td>Full Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Gender</td>
            <td>Address</td>
            <td>Action</td>
        </tr>`
    students.forEach((student, index) => { //DUYET ARRAY students
        let studentId = index
        let genderLabel = parseInt(student.gender) === 1 ? 'Male' : 'Female'
        index++
        tableContent += `
        <tr>
            <td>${index}</td>
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phoneNum}</td>
            <td>${genderLabel}</td>        
            <td>${student.address}</td>   
            <td>
                <a href="#" style="text-decoration: none">Edit</a>
                <a href="#" style="text-decoration: none" onclick='deleteStudent(${studentId})'>Delete</a>
            </td>     
        </tr>`
    })
    document.getElementById('grid-students').innerHTML = tableContent
}

const deleteStudent = (id) => {
    // console.log(id)
    let d = confirm('Are you sure you want to delete')
    if (d) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
        students.splice(id, 1) //xoa theo index array, xoa 1 cai
        localStorage.setItem('students', JSON.stringify(students))
        renderListStudent()
    }
}
