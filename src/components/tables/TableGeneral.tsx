import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Table } from "../../models/interfaces/tableInterface";
import "./TableGeneral.css";
import { useDispatch } from "react-redux";
import {
  setAllPlaylists,
  tooglePlaylistsId,
} from "../../redux/slices/playlists.slice";

interface TableGeneralProps {
  tableData: Table;
}

const TableGeneral = ({ tableData }: TableGeneralProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState(tableData.dataTable);

  useEffect(() => {
    const allSelected = tableData.dataTable.every((item) => item.isSelected);
    const check = document.getElementById("selectAll") as HTMLInputElement;
    if (check) {
      check.checked = allSelected;
    }

    if (allSelected) {
      selectAll({ target: { checked: true } });
    }
  }, [tableData.dataTable]);

  useEffect(() => {
    setSelectedData(tableData.dataTable);
  }, [tableData]);

  const selectAll = (e: { target: { checked: boolean } }) => {
    const isSelected = e.target.checked;
    const updatedData = selectedData.map((data) => ({
      ...data,
      isSelected,
    }));
    setSelectedData(updatedData);
    const ids = isSelected
      ? updatedData.map((data) =>
          tableData.type === "playlists" ? data.itemId : data.uri
        )
      : [];
    dispatch(setAllPlaylists({ ids, type: tableData.type }));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedData = selectedData.map((data, i) =>
      i === index ? { ...data, isSelected: !data.isSelected } : data
    );
    setSelectedData(updatedData);
    const element = updatedData.filter(
      (data) => data.itemId === updatedData[index].itemId
    )[0];
    const id = tableData.type === "playlists" ? element.itemId : element.uri;
    dispatch(tooglePlaylistsId({ id, type: tableData.type }));

    const allSelected = updatedData.every((item) => item.isSelected);
    const check = document.getElementById("selectAll") as HTMLInputElement;
    if (check) {
      check.checked = allSelected;
    }
  };

  console.log(tableData.dataTable);

  return (
    <>
      <table className="table">
        <thead className="table-header">
          <tr className="table-header-tr">
            <th className="table-header-th flex flex-col gap-2">
              <input
                type="checkbox"
                id="selectAll"
                onChange={(e) => selectAll(e)}
              />
              <label htmlFor="selectAll" className="text-[10px] md:text-[14px]">
                {t("Table.selected")}
              </label>
            </th>
            {tableData.headers.map((header) => (
              <th
                className={`table-header-th text-[10px] md:text-[14px] ${
                  header.responsive ? "table-cell" : "hidden md:table-cell"
                }`}
                key={header.value}
              >
                {header.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {selectedData.map((data, index) => (
            <tr
              className="table-body-tr"
              key={data.itemId}
              onClick={() => handleCheckboxChange(index)}
            >
              <td className="table-body-td">
                <input
                  type="checkbox"
                  id={`select-${data.itemId}`}
                  checked={data.isSelected}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td className="table-body-td">
                <div className="flex items-center justify-start gap-2 px-4">
                  <img src={data.image} alt="playlist image" className="w-10" />
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-[14px] text-left">{data.name}</span>
                    <span className="owner">{data.owner}</span>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell table-body-td lala">
                {data.info}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableGeneral;
