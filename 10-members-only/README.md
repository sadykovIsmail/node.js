# Members-Only Club App

A **Node.js** web application that allows users to register, log in, request membership codes, and access members-only content. The app uses **Express**, **Passport.js**, **PostgreSQL**, and **Nodemailer** for email-based membership verification.

---

## Features

- User registration and login with secure password hashing (bcrypt)
- Membership code generation and email verification
- Access control: only members can view exclusive posts
- Create and view posts on the members-only page
- Session management with **express-session**
- Flash messages for feedback

---

## Tech Stack

- **Backend:** Node.js, Express, Passport.js, bcrypt, Nodemailer  
- **Database:** PostgreSQL (local or hosted on Neon)  
- **Templating:** EJS  
- **Version Control:** Git & GitHub  

---

## Screenshots

**Dashboard (before membership):**  
![Dashboard Before](screenshots/dashboard_before.png)

**Request Membership Code:**  
![Request Code](screenshots/request_code.png)

**Members-Only Page:**  
![Members Page](screenshots/members_page.png)

---

## Getting Started

### Prerequisites

- Node.js v18+  
- PostgreSQL (local or hosted DB)  
- Git  

### Clone the repository

```bash
git clone https://github.com/sadykovIsmail/node.js.git
cd node.js/10-members-only
Install dependencies
bash
Копировать код
npm install
Configure environment variables
Create a .env file:

env
Копировать код
DATABASE_URL=postgresql://username:password@host:port/dbname
SECRET=mySuperSecretSessionKey

# Email (Gmail or other SMTP)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
For Gmail, you may need an App Password and enable less secure apps if necessary.

Initialize the database
sql

-- Example schema for PostgreSQL
CREATE TABLE members (
  member_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email_address VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  membership_status BOOLEAN DEFAULT FALSE,
  admin_status BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE club_posts (
  post_id SERIAL PRIMARY KEY,
  author_id INTEGER REFERENCES members(member_id),
  post_title VARCHAR(255) NOT NULL,
  post_body TEXT NOT NULL,
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Start the app
bash
Копировать код
node app.js
Open your browser at http://localhost:3000

Usage
Register or log in.

Request a membership code (sent to your email).

Enter the code in the dashboard.

Access members-only posts and create your own posts.

Contributing
Fork the repository

Create a branch (git checkout -b feature-name)

Make your changes

Commit (git commit -am 'Add new feature')

Push (git push origin feature-name)

Create a Pull Request

License
MIT License © Ismail Sadykov

Notes
For production deployment, use environment variables for DB credentials and email.

Ensure your SMTP service allows sending emails from Node.js (Gmail, Mailgun, etc.).

Remove temporary code storage if scaling to multiple servers; consider storing codes in DB with expiration.


