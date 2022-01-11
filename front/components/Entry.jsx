import { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Hidden, IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import Link from 'next/link'
import clsx from 'clsx';
import React from 'react';




const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    transition: 'height 500ms ease-in',

    ['@media only screen and  (max-width: 535px)']: {
      width: '100%',
      flexDirection: 'column',
    },
    ['@media only screen and (min-width: 535px) and (max-width: 768px)']: {
      width: '100%',
      flexDirection: 'column',
    },
    ['@media only screen and (width: 1024)']: {
      width: '100%',
      flexDirection: 'column',
    },
  },


  box: {
    flex: 1,
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.easeOut
    }),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    overflow: 'hidden',
    position:'relative',

  },
  '& > div': {
    maxWidth: '100vw',
    transition: theme.transitions.create(),


  },
  

  shop_1: {

    backgroundImage: `URL('http://localhost:8000/storage/uploads/finalLogo.png')`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundPosition: 'center ',
    backgroundSize: 'cover',
    textAlign: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#000',
      opacity: 0,
      transition: 'all 0.25s'
    },

    '&:hover::before': {
      opacity: 0.7
    },
   
  },
  

  shop_2: {
    
    backgroundImage: `URL('http://localhost:8000/storage/uploads/TRUESSS.png')`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundPosition: 'center ',
    backgroundSize: 'cover',
    textAlign: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#000',
      opacity: 0,
      transition: 'all 0.25s'
    },

    '&:hover::before': {
      opacity: 0.7
    },
   
   
  },
  hide: {
    flex: 0,
    '& > div': {
      maxWidth: 0,
      visibility: 'hidden',
      opacity: 0
    }
  },
  arrowBack: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10
  }
}))


export default function Entry() {
 
  const ref = useRef();
  const classes = useStyles();
  const [state, setState] = useState(null);

  function handleAnimate() {
    setTimeout(() => {
      ref.current.style.height = 0;
    }, 1000)
  }

  function handleClick(variant) {
    setState(variant)
  }

  return (
    <div className={classes.root}>
      <IconButton className={classes.arrowBack} onClick={() => {
        setState(null)
      }}>
        <ArrowBack htmlColor="white" />
      </IconButton>

      {/* Container */}

      <div ref={ref} id="container" className={classes.container}>
        {/* box day */}
        <Box
          variant="shop_1"
          state={state}
          onClick={handleClick}
          classes={classes}
        >


          <Link href="/categories?id=2">
            <Button
              style={{
                borderRadius: 25,
                backgroundColor: '#ffffff',
                opacity: 0.6,
                padding: "13px 25px",
                fontSize: "18px"
              }}
              onClick={handleAnimate}
              variant="contained">ORDER NOW</Button>



          </Link>
        </Box>

        {/* Box Night */}
        <Box
          variant="shop_2"
          state={state}
          onClick={handleClick}
          classes={classes}
        >
         
          <Link href="/categories?id=1">
            <Button 
              style={{
                borderRadius: 25,
                backgroundColor: '#ffffff',
                opacity: 0.6,
                padding: "13px 25px",
                fontSize: "18px"
              }}
            variant="contained"
            onClick={handleAnimate}>ORDER NOW</Button>
          </Link>
        </Box>
      </div>

    </div>
  )
}


function Box({ variant, state, onClick, classes, children }) {
  function handleClick() {
    onClick(variant)
  }
  return (
    <div onClick={handleClick}
      className={clsx(classes.box, classes[variant], {
        [classes.hide]: state && variant != state
      })}>
      <div>
        {children}
      </div>
    </div>

  )

}
Entry.layout = "withheaderfooter";