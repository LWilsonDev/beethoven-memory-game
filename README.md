# Music Memory
A memory game to help students learn iconic musical motifs by Beethoven. 

This game was specially made for Beethoven's 250th Centenery year, to help students in a school in Germany with their studies of Beethoven's music. I built it upon an existing msucial memory game that I wrote a little while ago.

The game is essentially just a typical memory card game, where the player needs to find the matching pairs in the fewest turns possible. The difference here is that each pair of cards has an accompanying musical motif. At the 'easy' level, the cards (or notes) have a picture of the motif in musical notation, so that even if the musical motifs are ignored, pairs can still be matched. Hopefully, the musical motifs will begin to be recognised, and the student will gain confidence in recognising the different pieces.

Once the user is familiar with the game, the 'hard' level can be selected. This removes all the notation, leaving all cards blank when turned, so that the only way to match them is by listening and matching the same musical motifs.

The site is live [here](https://lwilsondev.github.io/beethoven-memory-game/)

## UX
This game is aimed at children but should also be fun for adults. I wanted it to be clear and easy to use - without the need for lengthy instructions.

To keep the game lively and fun, I added some animations and a little fanfare when the game is won.

### Layout

On smaller devices the 'deck' of cards should take up nearly the full width and height so as to give as much room as possible to play, but not extend beyond the screen. I specified the proportion of view height and view width for the deck in the css to ensure that the whole deck would always fit on any device screen without the need for scrolling whilst playing.

On larger screens, the deck should remain in proportion, and the layout changes to allow for this and to keep all the information on the page in the same view.

## Features

- **German translation**: The game can be translated properly into German, because I was asked to create this for a school in Germany. I didnt wan't to rely on Google translate, so wrote the translation feature myself.
- **'Win' pop-out**: An animated 'pop-out' window appears when the final pair of cards is matched, together with a fanfare sound.
- **Easy Level**: This is the default level. All the cards have a picture to them to help find the matching pairs.
- **Hard Level**: All the picture faces are removed, leaving only question marks. The only way to match them is to listen for the matching motifs.
- **Sounds**: All MP3's were compiled from royalty-free recordings.
 
### Existing Features
- Deck of 12 cards (6 pairs) with 6 musical notes
- Animation for turning cards, matching pairs, and winning.
- Turn counter

### Features to implement
- I would like to implement the ability to choose the size of the board (the number of cards) at both levels.

### Game Logic
##### On load
 - The game is set up by shuffling the array of card indexes, and assigning each card a 'card-index' and a colour on the hidden side, by adding a css class ("color-" + cards[index]). 

##### On click
 There is an event listener which, when a card is clicked, fires the sound and the animation to flip the card. The following chain of events is triggered:
- These classes are added to the card: flipped, selected, disabled. These trigger the animation, start a count of how many cards are selected (max of two) and disable the card so it cannot be reclicked on that turn.
- The card-index is used to assign the correct MP3 note to each card, using a switch statement. The note is played.
- If 2 cards are flipped, check for a match
- Each time a pair is flipped (when there are 2 cards with the class 'selected'), the turn counter increases
- Check for win: If all 12 cards have been matched, the win pop-up shows (after a small delay to allow for the final note and animation to finish)


## Technologies Used

- [Javascript](https://www.javascript.com/)
- [SASS](https://sass-lang.com/)  
    - I wanted to use SCSS to create the CSS. I like the use of variables and mixins and it was something I wanted to practice and gain more experience with. 
- [Animate.scss](http://geoffgraham.me/animate-scss/)  
    - I used this adaptation of the [Animate.css](https://daneden.github.io/animate.css/) library of animations. I wanted to use SCSS so this was a perfect solution. I used the library animations as it was quicker and easier than writing my own, and I felt the results were better. I used three of the animations from the library - 'bounceIn' and 'bounceOut' for the 'win' pop-out, and 'Tada' for the matched pairs.
- I used Git and [Github](https://github.com/) for version control

## Testing

The game logic and all aspects of design and UX were tested manually. 

#### UX bugs
- Initially I had used a CSS flexbox grid to house the cards. However, when changing screen sizes the grid would change shape - going from 3 rows of 4, to 4 rows of 3 for example. If a user was resizing their screen during a game this would be annoying. To fix this I used the grid-template-columns property.

#### Logic bugs

- I had a few issues getting timing for the sounds right. If a player was going very fast and found a matching pair, the sound of the second note would not play. I discovered this was becuase the first MP3 had not finished playing. To fix, I added an if statement to each note to check if it was playing, pause and reset it.

- There was a bug with the reset button assigning the new colours before the animation to flip the card back over (and hide it from the user) had finished. To fix, I used a 'set timeout' function for reassigning colours on reset to delay the new assignment of colours.

- There was a bug involving the 'hard' and 'easy' buttons whereby if a user selected to change the mode mid-game, some of the colours were not being removed or added. This was because I was using the class of .spinback as the identifier when the 'hard' or 'easy' button was pressed. However, if the card had already been turned in that turn, then the spinback class had already been removed. To fix, I added another class (.reset) to each card to use solely as an identifier. 
## Deployment

I deployed this app using [Github pages](https://pages.github.com/)
I pushed the code to Github (I already had the repository as I used Github for version control). I then adjusted the repository settings to allow the page to be published on Github Pages.

## Credits

### Photos
- Beethoven image: https://www.wpclipart.com/famous/composers/Beethoven/Beethoven_light.png.html
- Scores provided by Raphael Petri

### Sounds
- MP3's compiled by Raphael Petri from royalty-free recordings 

### Acknowledgements

- I received inspiration for this project from
    - https://github.com/IonicaBizau/memory-blocks
    - https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript
- I used this shuffle function: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array   




https://www.wpclipart.com/famous/composers/Beethoven/Beethoven_light.png.html

https://www.pinclipart.com
