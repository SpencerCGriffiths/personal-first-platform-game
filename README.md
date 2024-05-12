# Platformer Game
Welcome to my first approach to building a platformer game. This project uses Object-Oriented Programming (OOP) to create and manage player characters and collision detection within a dynamic platformer environment.

## Play the Game
You can play the current version of the game at the following URL:
[Play Platformer Game](https://personal-first-platform-game.vercel.app/)

## Game Description
This platformer game features:
- **Player Controls**: Navigate a character through various platforms using keyboard inputs.
- **Collision Detection**: Interact with the game environment through custom-built collision detection logic.
- **In Game Physics**: Players are impacted by gravity and the ability to jump more than once has been limited.


## Development Principles
### Object-Oriented Programming (OOP)
The game leverages OOP principles to structure the gameplay mechanics:
- **Classes**: Utilizes classes such as `Sprite` and `Player`. These classes act as blueprints for creating objects with specific properties and methods.
- **Constructors**: Each class contains a constructor method that initializes new objects.
- **Instances**: Objects are instantiated in the `index.js` file, creating unique instances that interact within the game world.

## Future Development Plans
Whilst the core principles of the game such as the physics, collision detection and sprite animation have been implemented there are many steps to be added to this game. 
- **Objectives**: I intend to add a crown on each level that will be rendered at the top of the platformer to allow players to reach a target to complete the level. 
- **Further levels**: Upon collecting the crown i aim to use the currently collision detection principles in order to create futher levels to be completed with increasing difficulty. 
- **Mobile friendly design**: I aim to implement a set of on screen controls to allow for users to play the game on mobile. 

## Edit the Game

If you are interested in editing or contributing to the game, here are the steps to get started with the project files and documentation. The source code is structured to be modular and scalable, allowing for easy modifications and enhancements.

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- Git
- Node.js
- A code editor of your choice (e.g., VSCode)

### Clone the Repository
To get started, you'll need to clone the repository to your local machine. You can do this by running the following command in your terminal:

```bash
git clone https://github.com/SpencerCGriffiths/personal-first-platform-game.git
cd personal-first-platform-game
```

### Install Dependencies
Running the below command in the terminal whilst you are in the folder and this will install the necessary dependencies that are needed within the project. 

```bash
npm install
```
### Run the game locally
In order to run the game locally use the following command in the terminal. 

```bash
npm start
```
This will start the game on localhost and a link will appear the terminal. Clicking this link will run the game in browser. 

### Make changes and Push these changes

Now that you are running the game locally and have cloned the repository you can make additions to the code base and make sure to commit these git changes using the below commands: 

```bash
git add .
git commit -m "Describe your changes here"
git push origin master
```




## Tools Used
- **Tiled**: The game maps are designed using Tiled, an open-source level editor that helps in creating complex layouts with tiles.
- **JavaScript**: The primary programming language used for game development.

## Acknowledgements
Thank you for checking out my game! This has been an incredible learning experience, and I appreciate the support and feedback from the community.

This game was developed through the guidance of https://chriscourses.com/. 