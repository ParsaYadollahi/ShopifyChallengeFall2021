const themeFile = {
  palette: {
    primary: {
      light: '#ffffff',
      main: '#b3e5fc',
      dark: '#fafafa',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffffff',
      main: '#b3e5fc',
      dark: '#fafafa',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    body2: {
      fontSize: 12,
    }
  },

  addButton: {
    padding: '6px 20px',
    backgroundColor: '#333533',
    color: '#95bf47',
    boxShadow: 'none',
    border: '1px solid #95bf47',
    maxWidth: '30px',
    maxHeight: '30px',
    fontSize: '8px',
    '&:hover': {
      backgroundColor: '#3d4a3d',
      boxShadow: 'none',
    },
  },
  removeButton: {
    backgroundColor: '#333533',
    padding: '6px 20px',
    color: '#9c4941',
    boxShadow: 'none',
    border: '1px solid #9c4941',
    maxWidth: '30px',
    maxHeight: '30px',
    fontSize: '8px',
    '&:hover': {
      backgroundColor: '#4a3a3a',
      boxShadow: 'none',
    },
  },

  resultTitles: {
    fontWeigth: 500,
    padding: '20px 20px 5px 20px',
    color: '#d9ded1',
  },

  resultsLists: {
    padding: "0px 25px",
    color: '#d9ded1',
  },

  removeButtonDialog: {
    padding: '6px 20px',
    backgroundColor: '#333533',
    color: '#9c4941',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#4a3a3a',
      boxShadow: 'none',
    },
  },
  addButtonDialog: {
    padding: '6px 20px',
    backgroundColor: '#333533',
    color: '#95bf47',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#3d4a3d',
      boxShadow: 'none',
    },
  },
  colors: {
    grey: '#333533',
    green: '#95bf47',
    white: '#d9ded1'
  }

};

export default themeFile
