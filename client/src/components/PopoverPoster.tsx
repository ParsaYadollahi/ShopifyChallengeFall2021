import React, { useContext } from 'react'

// MUI
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { PopoverContext } from '../utils/MovieContext'

// Components
import poster404 from "./../images/poster404.png"


type Props = {
  moviePopoverPoster: string,
}


const PopoverPoster: React.FC<Props> = ({ moviePopoverPoster }) => {

  const { anchorElPopover, setAnchorElPopover } = useContext(PopoverContext)

  return (
    moviePopoverPoster !== '' ? (
      <Popover
        id="mouse-over-popover"
        open={Boolean(anchorElPopover)}
        anchorEl={anchorElPopover}
        onClose={() => { setAnchorElPopover(null) }}
        style={{ pointerEvents: 'none' }}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

        <Card>
          <CardMedia
            style={{ width: '150px' }}
            src={moviePopoverPoster === "N/A" ? poster404 : moviePopoverPoster}
            component="img"
            title="Movie poster"
          />
        </Card>

      </Popover>
    ) : (
      <> </>
    )
  )

}




export default PopoverPoster
