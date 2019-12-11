import React from 'react';


export function Company({company,edit,deleteCompany}) {
    const {id,name} = company

    return (
        <>
            <tr>
                <td style={{textAlign:"center"}}>{id}</td>
                <td style={{textAlign:"center"}}>{name}</td>
                <td style={{textAlign:"center"}}>
                    <div>
                        <button style={{ color: 'dark', backgroundColor: '#ffc107', borderColor: '#ffc107' }} className="button muted-button" onClick={() =>
                            edit(company)} >Edit</button>
                        <span style={{ marginLeft: '10px' }}></span>
                        <button className="button muted-button" onClick={() =>
                            {if (window.confirm('Are you sure you wish to delete this item?')) deleteCompany(company)}} style={{ color: 'dark', backgroundColor: '#20c997', borderColor: '#20c997' }} >Delete</button>
                    </div>
                </td>
            </tr>
        </>
    )

}