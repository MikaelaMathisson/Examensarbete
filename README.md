# Arlanda MX

Arlanda MX is a web application built with Next.js, React, and Tailwind CSS. It features a calendar component to display events, a contact form using Nodemailer, and various other functionalities.

## Features

- **Calendar**: Displays events with different colors and allows users to click on dates to see more details.
- **Contact Form**: Sends emails using Nodemailer.
- **Responsive Design**: Utilizes Tailwind CSS for styling.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework.
- **Nodemailer**: Module for Node.js applications to send emails.
- **PostgreSQL**: Database for storing event data.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/mikaelamathisson/arlanda-mx.git
    cd arlanda-mx
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your environment variables:
    ```env
    DATABASE_URL=your-database-url
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    ```

4. Run the development server:
    ```bash
    next dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



