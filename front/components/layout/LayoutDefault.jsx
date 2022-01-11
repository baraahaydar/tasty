import Sidebar from "../SideBar";
import Topbar from '../Topbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    container: {
        display: 'flex',
        marginTop: '10px'
    },
});
export default function LayoutDefault({ children }) {
    const styles = useStyles();
    return (
        <>
            <Topbar />
            <div className={styles.container}>
                <Sidebar />

                {children}

            </div>

        </>

    )
}