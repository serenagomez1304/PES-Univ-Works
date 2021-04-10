# Community Blog

Community blogs are predominantly websites where many authors can post journal entries on a single space. Our website is created with the intention of bringing like-minded bloggers together. It allows you to submit your blog article which can then be reviewed and promoted by other users. The review can be done by a voting system on the post.

Our website consists of four pages:

1. Login page:
    * There are two fields on this page, one to enter an email and one to enter a password.
    * These fields check the database for existing users.
    * If the entered details don’t belong to an existing user, he/she will have to create a new account via the Signup links in the navigation bar, which redirects them to a sign-up page.
    * The page checks if both the required fields are filled and gives an indicator if they are not.

2. Sign up page:
    * The fields on the signup page have a RegEx check to validate the entered email id.
    * The entered password is masked.
    * On entering all valid details and clicking on the ‘SIGNUP’ button, a new user will be registered.

3. Home page:
    * On signing in successfully, the user will be redirected to the home page, which contains the blogs posted by all users of the platform.
    * The User can interact with these posts via the voting poll.
    * The navigation bar, on signing in successfully, provides links to the user’s profile, create post, and log out. 

4. Profile page:
    * The profile page contains all the posts posted by the user currently logged in. 
    * The user can delete their posts from this page. 