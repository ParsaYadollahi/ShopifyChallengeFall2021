module.exports = {
    'Non-existing movie test': (browser) => {
        const movieTitle = 'aaabbccc';
        const seachBar = '#title';
        const snackBar = '#snackBarError';
        const strongMovieTitle = '#strongMovieTitleError';
        browser
            .url('http://localhost:3000/')
            .assert.elementPresent(seachBar)
            .setValue(seachBar, [movieTitle, browser.Keys.ENTER])
            .assert.elementPresent(snackBar)
            .assert.elementPresent(strongMovieTitle)
            .assert.containsText(strongMovieTitle, movieTitle)
            .end();
        browser.pause(2 * 1000);
    },

    'adding-6-movies test': (browser) => {
        const movieTitle = 'avengers';
        const seachBar = '#title';

        const firstResult = '#button0';
        const secondResult = '#button1';
        const thirdResult = '#button2';
        const fourthResult = '#button3';
        const fifthResult = '#button4';
        const sixthResult = '#button5';

        const snackBar = '#snackBarWarning';
        const strongMovieTitle = '#strongMovieTitleWarning';

        browser
            .url('http://localhost:3000/')
            .assert.elementPresent(seachBar)
            .setValue(seachBar, [movieTitle, browser.Keys.ENTER])
            .assert.elementPresent(firstResult)
            .click(firstResult)
            .assert.elementPresent(secondResult)
            .click(secondResult)
            .assert.elementPresent(thirdResult)
            .click(thirdResult)
            .assert.elementPresent(fourthResult)
            .click(fourthResult)
            .assert.elementPresent(fifthResult)
            .click(fifthResult)
            .assert.elementPresent(sixthResult)
            .assert.elementPresent(snackBar)
            .assert.elementPresent(strongMovieTitle)
            .assert.containsText(strongMovieTitle, 'Delete')
            .end();
        browser.pause(2 * 1000);
    },

    'adding-and-deleteing-movies test': (browser) => {
        const movieTitle = 'avengers';
        const seachBar = '#title';

        const firstResult = '#button0';
        const secondResult = '#button1';
        const thirdResult = '#button2';
        const fourthResult = '#button3';
        const fifthResult = '#button4';
        const sixthResult = '#button5';

        const lastResultDelete = '#deleteButton4';

        const snackBar = '#snackBarWarning';
        const strongMovieTitle = '#strongMovieTitleWarning';

        browser
            .url('http://localhost:3000/')
            .assert.elementPresent(seachBar)
            .setValue(seachBar, [movieTitle, browser.Keys.ENTER])
            .assert.elementPresent(firstResult)
            .click(firstResult)
            .assert.elementPresent(secondResult)
            .click(secondResult)
            .assert.elementPresent(thirdResult)
            .click(thirdResult)
            .assert.elementPresent(fourthResult)
            .click(fourthResult)
            .assert.elementPresent(fifthResult)
            .click(fifthResult)
            .assert.elementPresent(sixthResult)
            .assert.elementPresent(snackBar)
            .assert.elementPresent(strongMovieTitle)
            .assert.containsText(strongMovieTitle, 'Delete')
            .waitForElementVisible(lastResultDelete, 10000)

            .assert.elementPresent(lastResultDelete)
            .click(lastResultDelete)

            .end();
    },

    'deleting-a-movies test': (browser) => {
        const movieTitle = 'avengers';
        const seachBar = '#title';
        const firstResult = '#button0';
        const firstResultDelete = '#deleteButton0';

        browser
            .url('http://localhost:3000/')
            .assert.elementPresent(seachBar)
            .setValue(seachBar, [movieTitle, browser.Keys.ENTER])
            .assert.elementPresent(firstResult)
            .click(firstResult)
            .assert.elementPresent(firstResultDelete)
            .click(firstResultDelete)
            .assert.not.elementPresent(firstResultDelete)
            .end();
        browser.pause(2 * 1000);
    },

    'local-storage-keep test': (browser) => {
        const movieTitle = 'avengers';
        const seachBar = '#title';
        const firstResult = '#button0';
        const dialogKeep = '#dialogKeep';
        const buttonKeep = '#buttonKeep';
        const firstResultDelete = '#deleteButton0';

        browser
            .url('http://localhost:3000/')
            .assert.elementPresent(seachBar)
            .setValue(seachBar, [movieTitle, browser.Keys.ENTER])
            .assert.elementPresent(firstResult)
            .click(firstResult)
            .assert.elementPresent(firstResultDelete);

        browser
            .url('http://localhost:3000/')
            .assert.elementPresent(dialogKeep)
            .assert.elementPresent(buttonKeep)
            .click(buttonKeep)
            .assert.elementPresent(firstResultDelete)

            .end();
        browser.pause(2 * 1000);
    },

    'local-storage-keep test': (browser) => {
        const movieTitle = 'avengers';
        const seachBar = '#title';
        const firstResult = '#button0';
        const dialogKeep = '#dialogKeep';
        const buttonClear = '#buttonClear';
        const firstResultDelete = '#deleteButton0';

        browser
            .url('http://localhost:3000/')
            .assert.elementPresent(seachBar)
            .setValue(seachBar, [movieTitle, browser.Keys.ENTER])
            .assert.elementPresent(firstResult)
            .click(firstResult)
            .assert.elementPresent(firstResultDelete);

        browser
            .url('http://localhost:3000/')
            .assert.elementPresent(dialogKeep)
            .assert.elementPresent(buttonClear)
            .click(buttonClear)
            .assert.not.elementPresent(firstResultDelete)

            .end();
        browser.pause(2 * 1000);
    },
};
