import { DataGrid } from "@mui/x-data-grid";

export default function CustomizedDataGrid(params: any) {
  const { rows, columns } = params.value;
  const { onSelectionChange } = params;
  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      checkboxSelection
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      onCellClick={({ row }) => onSelectionChange(row)}
      processRowUpdate={(newRow) => console.log(newRow)}
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      sx={{ fontFamily: "'Public Sans', sans-serif", borderRadius: 3 }}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
        pagination: { style: { fontFamily: "'Public Sans', sans-serif" } },
      }}
    />
  );
}
