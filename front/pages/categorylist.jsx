import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Link from "next/link";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../API"
import swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { getServerSidePropsHandler, usePrivacyChecker } from "../utils";

const useStyles = makeStyles({
  productList: {
    flex: 4,
  },

  productListItem: {
    display: "flex",
    alignItems: "center",
  },

  productListImg: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginRight: "10px",
  },

  productListEdit: {
    color: "blue",
    cursor: "pointer",
    marginRight: "20px",
  },

  productListDelete: {
    color: "red",
    cursor: "pointer",
  },
});
export const getServerSideProps = async (req, res) => {
  let result = await API.get("category");
  let categories = result.data.data;

  return {
    props: {
      categories,
    },
  };
};
export default function CategoryList(props) {
  const styles = useStyles();
  usePrivacyChecker();


  const [data, setData] = useState(props.categories);

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
          API.delete(`category/${id}`);

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
    {
      field: "type",
      headerName: "Name",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
         
            <Link href={"/category/" + params.row.id}>
            
              <IconButton>
                <EditIcon style={{ color: "blue" }} />
              </IconButton>
            </Link>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          
          </>
        );
      },
    },
  ];

  return (
  
     <>
      <div>
       
      </div>
      <div className={styles.productList}>
      <Link href="/newcategory">
    <Button variant="contained" color="primary">
      Create
    </Button>
  </Link>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
        />
      </div>
    </>
  );
}
CategoryList.layout = "default";