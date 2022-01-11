import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import API from "../API";
import swal from "sweetalert2";
import { getServerSidePropsHandler, usePrivacyChecker } from "../utils";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  userList: {
    flex: 4,
  },

  userListItem: {
    display: "flex",
    alignItems: "center",
  },

  userListImg: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px",
  },


  userListEdit: {
    border: "none",
    borderRadius: "10px",
    padding: "5px 10px",
    backgroundColor: "#3bb077",
    color: "white",
    cursor: "pointer",
    marginRight: "20px",
  },

  userListDelete: {
    color: "red",
    cursor: "pointer",
  },
});
/////////////////////
export const getServerSideProps = getServerSidePropsHandler(async (ctx) => {
  let result = await API.get("admin");
  let admins = result.data.data;

  return {
    props: {
      admins,
    },
  };
});

export default function UserList(props) {
  usePrivacyChecker();
  
  const styles = useStyles();
  const [data, setData] = useState(props.admins);

  const handleDelete = async (id) => {
    await swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      })
      .then((result) => {
        if (result.isConfirmed) {
          API.delete(`admin/${id}`);

          setData(data.filter((item) => item.id !== id));
          swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success"
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 90 },
    { field: "username", headerName: "Username", width: 90 },
    { field: "password", headerName: "Password", width: 90 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={"/user/" + params.row.id}>
              <a>Edit</a>
            </Link>
            <DeleteOutline
              className={styles.userListDelete}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    
    <div className={styles.userList}>
       <div>
        <Link href="/newuser">
          <Button variant="contained" color="primary">
            Create
          </Button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
  
      />
    </div>
  );
}

UserList.layout = "default";
