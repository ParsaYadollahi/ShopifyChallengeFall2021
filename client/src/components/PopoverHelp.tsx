
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography"

// utils
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import themeFile from '../utils/theme';

const useStyles = makeStyles((theme: Theme & typeof themeFile) => {
  return ({
    typographyHelp: {
      color: themeFile.colors.white
    }
  })
});

const PopoverHelp = () => {
  const classes = useStyles()

  return (
    <Card style={{ backgroundColor: themeFile.colors.grey }}>
      <CardContent>

        <Typography className={classes.typographyHelp} variant="h6" component="h2">
          Movie awards for entrepreneurs
        </Typography>
        <Typography className={classes.typographyHelp} variant="subtitle2" component="h2">
          - Type a movie name in the search bar and press enter to list all movies related to that title.
        </Typography>
        <Typography className={classes.typographyHelp} variant="subtitle2" component="h2">
          - If you can't find your movie, try removing some of the words to broaden the seach scope
        </Typography>
        <Typography className={classes.typographyHelp} variant="subtitle2" component="h2">
          - To add movies to your nomintation list, click on the green "Nominate" button to the right of the movie title
        </Typography>
        <Typography className={classes.typographyHelp} variant="subtitle2" component="h2">
          - You can preview more details of the movie by clicking on the title of the movie
        </Typography>
        <Typography className={classes.typographyHelp} variant="subtitle2" component="h2">
          - To remove movies from your nomination list, click on the red "remove" button to the right of movie title in the nomination list
        </Typography>

      </CardContent>
    </Card>
  )
}

export default PopoverHelp
