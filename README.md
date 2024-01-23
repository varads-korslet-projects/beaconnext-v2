# Beaconnext Server API Reference

## Base URL
```
http://170.64.198.55:8000/api
```

## Endpoints
/getall: Used for testing connectivity
```
api/getAll
```
Returns JSON:
```
{"hiii":"hello"}
```
Certainly! Below is the GitHub Markdown (`README.md`) for your Student API documentation:


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
      "email": "john.doe@example.com",
      "moodleId": 12345,
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

## Count Attendance
### Endpoint
`POST /count-attendance`

### Request Body
- `lecture` (String): Identifier for the lecture.

### Response
- Status Code: `200 OK`
- Body: JSON message indicating the attendance status.

## Get Current Student
### Endpoint
`POST /current-student`

### Request Headers
- `Authorization` (String): JWT token for authentication.

### Response
- Status Code: `200 OK`
- Body: JSON object containing details of the current student.

## Get All Students (Sample Endpoint)
### Endpoint
`GET /getAll`

### Response
- Status Code: `201 Created`
- Body: JSON object with a sample message ("hiii": "hello").

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

---

**Note:** For endpoints requiring authentication, make sure to include the `Authorization` header with the JWT token obtained during login. Use appropriate error codes and messages for unsuccessful scenarios. Ensure that the environment variables like `passkeyStudent`, `passkeyTeacher` and `signingkey` are properly configured for security.

