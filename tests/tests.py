import requests
import json
import secret

base_url = secret.BASE_URL
passkey_student = secret.STUDENT_PASSKEY
passkey_teacher = secret.TEACHER_PASSKEY
signing_key = secret.SIGNING_KEY

# Helper function to print response details
def print_response(response):
    print("Status Code:", response.status_code)
    print("Response Body:", response.text)

# Helper function to handle student login and return the JWT token
def student_login(moodle_id, password, device_id):
    url = f"{base_url}/student-login"
    data = {"moodleId": moodle_id, "password": password, "deviceId": device_id}
    response = requests.post(url, json=data)
    print_response(response)
    return response.json().get("token")

# Helper function to handle teacher login and return the JWT token
def teacher_login(email, password):
    url = f"{base_url}/teacher-login"
    data = {"email": email, "password": password}
    response = requests.post(url, json=data)
    print_response(response)
    return response.json().get("token")

# Test /getAll endpoint for testing connectivity
def test_get_all():
    url = f"{base_url}/getAll"
    response = requests.get(url)
    print_response(response)

# Test creating student accounts
def test_create_student_accounts():
    url = f"{base_url}/create-student-accounts"
    headers = {"passkey": passkey_student}
    students_data = {
        "students": [
            {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "moodleId": 12345,
                "year": 1,
                "division": "A",
                "deviceId": "abcd1234",
                "hash_password": "old_password"
            },
            # Add more students as needed
        ]
    }
    response = requests.post(url, headers=headers, json=students_data)
    print_response(response)

# Test student first login
def test_student_first_login():
    url = f"{base_url}/first-student-login"
    data = {"moodleId": 12345, "oldPassword": "old_password", "newPassword": "new_password", "deviceId": "abcd1234"}
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(url, headers=headers, json=data)
    print_response(response)

# Test student login
def test_student_login():
    url = f"{base_url}/student-login"
    data = {"moodleId": 12345, "password": "new_password", "deviceId": "abcd1234"}
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(url, headers=headers, json=data)
    print_response(response)

# Test creating teacher accounts
def test_create_teacher_accounts():
    url = f"{base_url}/create-teacher-accounts"
    headers = {"passkey": passkey_teacher}
    teachers_data = {
        "teachers": [
            {
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "hash_password": "hashed_password"
            },
            # Add more teachers as needed
        ]
    }
    response = requests.post(url, headers=headers, json=teachers_data)
    print_response(response)

# Test teacher first login
def test_teacher_first_login():
    token = teacher_login("jane.smith@example.com", "old_password")
    url = f"{base_url}/first-teacher-login"
    data = {"email": "jane.smith@example.com", "oldPassword": "old_password", "newPassword": "new_password"}
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(url, headers=headers, json=data)
    print_response(response)

# Test teacher login
def test_teacher_login():
    token = teacher_login("jane.smith@example.com", "new_password")
    url = f"{base_url}/teacher-login"
    data = {"email": "jane.smith@example.com", "password": "new_password"}
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(url, headers=headers, json=data)
    print_response(response)

# Test creating lecture
def test_create_lecture():
    teacher_token = teacher_login("jane.smith@example.com", "new_password")
    url = f"{base_url}/create-lecture"
    headers = {"Authorization": f"Bearer {teacher_token}"}
    lecture_data = {
        "subjectName": "Mathematics",
        "StartTime": "2024-01-23T08:00:00Z",
        "EndTime": "2024-01-23T09:30:00Z",
        "year": 2,
        "division": "B",
        "roomNo": 101,
        "minimumTime": 60
    }
    response = requests.post(url, headers=headers, json=lecture_data)
    print_response(response)

# Test counting attendance
def test_count_attendance():
    teacher_token = teacher_login("jane.smith@example.com", "new_password")
    url = f"{base_url}/count-attendance"
    headers = {"Authorization": f"Bearer {teacher_token}"}
    lecture_data = {"lecture": "math_lecture"}
    response = requests.post(url, headers=headers, json=lecture_data)
    print_response(response)
