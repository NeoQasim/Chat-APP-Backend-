# CHAT VISTA

## Description

This project is a Node.js backend for a real-time messaging application with user authentication and authorization. It uses MongoDB for data storage and Socket.io for real-time communication between users. The backend includes features such as user registration, login, fetching all users (except the current user), adding and retrieving messages, and tracking online users.

Installation
Clone the repository:

git clone https://github.com/your-username/your-repo.git
Install dependencies:

cd your-repo
npm install
Set up environment variables:

Create a .env file in the root directory and add the following variables:

env
PORT=your_preferred_port
MONGODB_URI=your_mongodb_connection_string
Usage
To run the application locally:

npm start
API Endpoints
Register User
Endpoint: /api/register
Method: POST
Request Body:
json
{
"name": "example",
"email": "example@example.com",
"password": "your_secure_password"
}
Response:
json
{
"status": true,
"authenticatedUser": {
"name": "example",
"email": "example@example.com",
"avatarImage": "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
"\_id": "user_id"
}
}
Login User
Endpoint: /api/login
Method: POST
Request Body:
json
{
"email": "example@example.com",
"password": "your_secure_password"
}
Response:
json
{
"status": true,
"authenticatedUser": {
"name": "example",
"email": "example@example.com",
"avatarImage": "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
"\_id": "user_id"
}
}
Get All Users (except current user)
Endpoint: /api/users/:id
Method: GET
Response:
json
[
{
"name": "user1",
"email": "user1@example.com",
"avatarImage": "user1_avatar_url",
"_id": "user1_id"
},
{
"name": "user2",
"email": "user2@example.com",
"avatarImage": "user2_avatar_url",
"_id": "user2_id"
}
// ...more users
]
Socket Events
Add User to Online Users
Event: add-user
Data:
json
"user_id"
Send Message
Event: sendmessage
Data:
json
{
"from": "sender_id",
"to": "recipient_id",
"message": "your_message"
}
Message Received
Event: messagerecieved
Data:
json
"received_message"
