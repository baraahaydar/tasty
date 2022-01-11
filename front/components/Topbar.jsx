import React from "react";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  topbar: {
    width: '100%',
    height: '50px',
    backgroundColor: 'white',
    position: 'sticky',
    top: '0',
    zIndex: '999'
  },

  topbarWrapper: {
    height: '100%',
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  logo: {
    fontWeight: 'bold',
    fontSize: '25px',
    color: 'darkblue',
    cursor: 'default'
  },

  topRight: {
    display: 'flex',
    alignItems: 'center'
  },

  topbarIconContainer: {
    position: 'relative',
    cursor: 'default',
    marginRight: '10px',
    color: '#555'
  },
  topIconBadge: {
    width: '15px',
    height: '15px',
    position: 'absolute',
    top: '-5px',
    right: '0px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px'
  },

  topAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'default'
  }
});
export default function Topbar() {
  const styles = useStyles();
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarWrapper}>
        <div className={styles.topLeft}>
          <span className={styles.logo}>Dashboard</span>
        </div>
         <div className={styles.topRight}>
           <h2>Tasty Website</h2>
          </div> 
      </div>
    </div>
  );
}