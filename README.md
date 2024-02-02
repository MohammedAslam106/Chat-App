## Chat-App
Welcome to Chat-App, a platform where users can connect with new friends and engage in conversations. If the desired user isn't registered, we've got you covered – invite them via email using our convenient Nodemailer integration.

## Features
<ul>
  <li> <b>User Registration:</b> Sign up and create your account effortlessly with Firebase Authentication.</li>
  <li>
    <b>Friend Discovery:</b> Find and connect with new friends on the platform.
  </li>
  <li>
    <b>Real-time Chat:</b> Enjoy seamless real-time conversations with your friends.
  </li>
  <li>
    <b>Nodemailer Integration:</b> Invite friends to join the platform by sending email invitations.  
    
  </li>
</ul>

## Technologies Used
<ul>
  <li>
    <b>Frontend:</b> Built with Chakra UI for a sleek and responsive design.
  </li>
  <li>
    <b>Framework:</b> Utilized Next.js with TypeScript for efficient and scalable development.
  </li>
  <li>
    <b>Database:</b> Firebase used for user data storage.
  </li>
  <li>
    <b>Authentication:</b> Firebase Authentication for secure sign-ins with Google and GitHub.
  </li>
</ul>

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MohammedAslam106/Chat-App.git

2. **Install dependencies:**

    ```bash
    cd Chat-App
    npm install

3. **Set up Firebase:**

    <ul>
      <li>Create a Firebase project on the Firebase Console.</li>
      <li>Obtain your Firebase configuration and replace it in firebaseConfig in the relevant code file.</li>
    </ul>

4. **Run the development server:**

    ```bash
    
    npm run dev
    
5. **Open http://localhost:3000 in your browser.**

## Nodemailer Setup
To enable the email invitation feature, set up your Nodemailer configuration. Modify the nodemailerConfig object in the relevant code file with your email service provider's credentials.

    ```typescript
    
      const nodemailerConfig = {
        host: 'your-smtp-host',
        port: 587,
        secure: false,
        auth: {
          user: 'your-email@example.com',
          pass: 'your-email-password',
        },
      };

## Contributing
We welcome contributions! Feel free to open issues or pull requests to help improve Chat-App.

Happy chatting! 🚀
