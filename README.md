# Beaconnext Server API Reference

## Base URL
```
http://localhost:8000/api
```
`GET /test`
To test if server is reachable
### Response
- Status Code: `200 Ok`
- Body: {"online":"true"}
---

# Student API Documentation

## Create Student Accounts
### Endpoint
`POST /create-student-accounts`

### Request Headers
- `passkey` (String): Passkey for authentication.

### Request Body
- `students` (Array): An array of student objects.

Example:
```json
{
  "students": [
    {
      "name": "John Doe",
      "gender": "M",
      "email": "john.doe@example.com",
      "moodleId": 12345,
      "department": "CS",
      "year": 1,
      "division": "A",
      "deviceId": "abcd1234",
      "hash_password": "hashed_password"
    },
    // Add more students as needed
  ]
}
```

### Response
- Status Code: `201 Created`
- Body: JSON array containing details of the created students.

## Student First Login
### Endpoint
`POST /first-student-login`

### Request Body
- `moodleId` (Number): Moodle ID of the student.
- `oldPassword` (String): Old password for verification.
- `newPassword` (String): New password to be set.
- `deviceId` (String): Device ID of the student.

### Response
- Status Code: `201 Created`
- Body: JSON object containing a success message and a JWT token.

## Student Login
### Endpoint
`POST /student-login`

### Request Body
- `moodleId` (Number): Moodle ID of the student.
- `password` (String): Password for authentication.
- `deviceId` (String): Device ID of the student.

### Response
- Status Code: `201 Created`
- Body: JSON object containing a success message and a JWT token.

## Get Current Student
### Endpoint
`POST /current-student`

### Request Headers
- `Authorization` (String): JWT token for authentication.

### Response
- Status Code: `200 OK`
- Body: JSON object containing details of the current student.

## Get All Students 
### Endpoint
`GET /getAll`

### Response
- Status Code: `200 OK`
- Body: JSON object containing details of the all students.

---



# Teacher API Documentation

## Create Teacher Accounts
### Endpoint
`POST /create-teacher-accounts`

### Request Headers
- `passkey` (String): Passkey for authentication.

### Request Body
- `teachers` (Array): An array of teacher objects.

Example:
```json
{
  "teachers": [
    {
      "name": "Jane Smith",
      "gender": "M",
      "department": "CS",
      "email": "jane.smith@example.com",
      "hash_password": "hashed_password"
    },
    // Add more teachers as needed
  ]
}
```

### Response
- Status Code: `201 Created`
- Body: JSON array containing details of the created teachers.

## Teacher First Login
### Endpoint
`POST /first-teacher-login`

### Request Body
- `email` (String): Email of the teacher.
- `oldPassword` (String): Old password for verification.
- `newPassword` (String): New password to be set.

### Response
- Status Code: `201 Created`
- Body: JSON object containing a success message and a JWT token.

## Teacher Login
### Endpoint
`POST /teacher-login`

### Request Body
- `email` (String): Email of the teacher.
- `password` (String): Password for authentication.

### Response
- Status Code: `201 Created`
- Body: JSON object containing a success message and a JWT token.

## Get Current Teacher
### Endpoint
`POST /current-teacher`

### Request Headers
- `Authorization` (String): JWT token for authentication.

### Response
- Status Code: `200 OK`
- Body: JSON object containing details of the current teacher.


# Lecture API Documentation

## Create Lecture
### Endpoint
`POST /create-lecture`

### Request Headers
- `Authorization` (String): JWT token for teacher authentication.

### Request Body
- `subjectName` (String): Name of the subject.
- `StartTime` (Date): Start time of the lecture.
- `EndTime` (Date): End time of the lecture.
- `year` (Number): Year of the lecture.
- `division` (String): Division of the lecture.
- `roomNo` (Number): roomNo of the lecture.
- `minimumTime` (Number): Minimum time required for attendance.

Example:
```json
{
  "subjectName": "Mathematics",
  "StartTime": "2024-01-23T08:00:00Z",
  "EndTime": "2024-01-23T09:30:00Z",
  "Department":"CS",
  "year": 2,
  "division": "B",
  "roomNo": 101,
  "minimumTime": 60
}
```

### Response
- Status Code: `201 Created`
- Body: JSON object containing details of the created lecture.

## Lecture Status
### Endpoint
`GET /lecture-status`

### Request Body
- `lecture` (String): ObjectId of lecture we want to lookup

### Response
- 200: Status of the lecture (Ongoing/Inactive)

## Upcoming Lectures

### Request Headers
- `Authorization` (String): JWT token for teacher authentication.

### Endpoint
`GET /upcoming`

### Response
- 200: Upcoming lectures for the faculty

# Attendance API Documentation

## Count Attendance
### Endpoint
`POST /count-attendance`

### Request Body
- `lecture` (String): Identifier for the lecture.

### Response
- Status Code: `200 OK`
- Body: JSON message indicating the attendance status.

---

**Note:** For endpoints requiring authentication, make sure to include the `Authorization` header with the JWT token obtained during login. Use appropriate error codes and messages for unsuccessful scenarios. Ensure that the environment variables like `passkeyStudent`, `passkeyTeacher` and `signingkey` are properly configured for security.

---