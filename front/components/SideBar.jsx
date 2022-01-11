import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CategoryIcon from "@material-ui/icons/Category";
import SessionContext from '../components/session/SessionContext';
import { useContext } from 'react';
import router from 'next/router';
import {
  LineStyle,
  PermIdentity,
  Storefront,
  WorkOutline,
} from "@material-ui/icons";
import Link from "next/link";

const useStyles = makeStyles({
  sidebar: {
    flex: "1",
    height: "calc(100vh - 50px)",
    backgroundColor: "rgb(251, 251, 255)",
    position: "sticky",
    top: "50px",
  },
  sidebarWrapper: {
    padding: "20px",
    color: "#555",
  },

  sidebarMenu: {
    marginBottom: "10px",
  },

  sidebarTitle: {
    fontSize: "13px",
    color: "rgb(187, 186, 186)",
  },

  sidebarList: {
    listStyle: "none",
    padding: "5px",
  },

  sidebarListItem: {
    padding: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    marginBottom: "20px",

    "&:hover": {
      border: "solid 1px",
      width:200,
    },
  },

  sidebarIcon: {
    marginRight: "5px",
    fontSize: "20px !important",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {},
  },
});
export default function Sidebar() {
  const styles = useStyles();
  const {
    actions:{logout}
  }=useContext(SessionContext)
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarListItem}>
              <LineStyle className={styles.sidebarIcon} />
              <Link href="/">
                <a className={styles.link}>Home</a>
              </Link>
            </li>

            <li className={styles.sidebarListItem}>
              <PermIdentity className={styles.sidebarIcon} />
              <Link href="/userlist">
                <a className={styles.link}>Users</a>
              </Link>
            </li>
            <li className={styles.sidebarListItem}>
              <CategoryIcon className={styles.sidebarIcon} />
              <Link href="/categorylist" className={styles.link}>
                <a className={styles.link}>Categories</a>
              </Link>
            </li>
            <li className={styles.sidebarListItem}>
              <Storefront className={styles.sidebarIcon} />
              <Link href="/productlist" className={styles.link}>
                <a className={styles.link}>Products</a>
              </Link>
            </li>
            <li className={styles.sidebarListItem} style={{bottom:0,position:"absolute"}}>
              <ExitToAppIcon className={styles.sidebarIcon} />
             
                <a onClick={async()=>{await logout();router.push('/')}} className={styles.link}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}