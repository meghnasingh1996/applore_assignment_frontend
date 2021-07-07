import React ,  { useEffect, useState }from 'react';
import './table.styles.scss';
import { useTable } from 'react-table';
import { getUser } from  './table-data';

const Table = () => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('token'));
    const [ data , setData ] = useState([]);

    useEffect(()=>{
        if ( getTokenFromLocalStorage){
        getUser()
        .then(items => {
            setData(items)
        })
    }
    } ,[]);

const columns = React.useMemo(() => [
    {
        Header : 'Name',
        accessor: "name"
    },
    {
        Header : 'Email',
        accessor: "email"
    }
], []);

const tableInstance = useTable({ columns, data });
const { getTableProps,getTableBodyProps,headerGroups,rows, prepareRow,} = tableInstance;

   return(
    <table {...getTableProps()} className='table'>
    <thead className="head">
    {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} className="head_row">
        {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()} className="head_row_item">{column.render('Header')}</th>
        ))}
        </tr>
    ))}
    </thead>
    <tbody {...getTableBodyProps()} className="body">
    {rows.map(row => {
        prepareRow(row)
        return(
            <tr {...row.getRowProps()} className="body_row">
            {
                row.cells.map( (cell) => {
                    return <td {...cell.getCellProps()} className="body_row_item">{cell.render('Cell')}</td>
                })
            }
        </tr>
        )
    })}
    </tbody>
  </table>
   );

}

export default Table;