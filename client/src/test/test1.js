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
            .assert.elementPresent(strongMovieTitle);
        browser.pause(2 * 1000);
    },
};
