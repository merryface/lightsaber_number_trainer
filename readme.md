# README for Lightsaber Combat Trainer

This readme was created almost entirely by ChatGPT 4 😲 I created this app so that I could practice, but also to use in the classes I'll be running.

## Overview

Lightsaber Combat Trainer is an innovative web application designed specifically for those practicing stage combat with lightsabers. The app aids in training users to quickly recognize and execute lightsaber moves, which are numbered 1-9, encompassing a range of attacks and blocks. By improving reaction times and familiarity with this numbered system, the application serves as an essential tool for anyone looking to enhance their proficiency in staged lightsaber combat under this system. The system in question was created (or at least introduced to me) by the Youtuber [Mike StarWalker](https://www.youtube.com/@Mikestarwalker).

## Features

- **Dynamic Move Display**: The application displays numbers 1-9, each representing a specific lightsaber attack or block move.
- **Action Commands**: Alongside numbers, users receive "Attack" or "Block" commands, to simulate real combat scenarios.
- **Responsive Gameplay**: The app challenges users to respond quickly, thereby improving reaction times and move execution.
- **Engaging Visual Effects**: A Star Wars-themed hyperspace background enhances the training experience.
- **Voice Commands**: Integration of speech synthesis to announce moves and actions.
- **2-1 Choreography Trainer**: Select the Sith or the Jedi side of the [2-1 Choreography](https://www.youtube.com/watch?v=4sfrCborBwg&t=67s&pp=ygUcMi0xIGxpZ2h0c2FiZXIgY2hvcmVvZ3JhcGh5IA%3D%3D) created by Mike Skywalker.

## File Structure

- `index.html`: Main HTML document of the project.
- `style.css`: Contains CSS styles, focusing on layout, design, and responsiveness.
- `background.css`: Styles for the Star Wars hyperspace background effect.
- `background.js`: JavaScript logic for the hyperspace background animation.
- `index.js`: Core JavaScript file handling game logic, number and action generation, and voice announcements.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- GreenSock Animation Platform (GSAP): For fluid animations.
- Web Speech API: For text-to-speech functionality, providing audible cues for moves.

## Setup and Installation

1. Download the source code or clone the repository.
2. Open `index.html` in a modern web browser to start the application.
3. No additional installations are needed, as all scripts are included or sourced from CDNs.

## Usage

After launching the application, users can start their lightsaber combat training by clicking the "Start" button. The app will randomly display numbers (1-9) and corresponding "Attack" or "Block" commands. Users should perform the indicated lightsaber move as quickly as possible. Training sessions can be paused or stopped using the "Stop" button.

## Customization

- **Speed Adjustment**: Change the `lowestTime` and `highestTime` variables in `index.js` to modify the pace of move generation.
- **Appearance**: Customize colors and layout in `style.css` and `background.css`.
- **Move Range Customization**: Adapt the `randomOneToNine` function in `index.js` for different move ranges or sequences.

## Contributing

Contributions to enhance the Lightsaber Combat Trainer are always welcome. Please fork the repository and submit pull requests with any changes or improvements.

## License

This project is open-sourced under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For questions, suggestions, or collaborations, please open an issue in the GitHub repository of the project.

---

Lightsaber Combat Trainer is an immersive experience for enthusiasts and practitioners of stage lightsaber combat. It's designed to offer a challenging yet enjoyable way to master the art of lightsaber moves, improving both speed and accuracy in a uniquely themed environment.
