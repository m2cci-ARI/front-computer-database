import { Col, Row } from 'reactstrap'
import AddComputer from './Add-computer/AddComputer';
import  Button  from 'react-bootstrap/Button';
import EditComputer from './Edit-Computer/EditComputer'
import React , { useState, useEffect } from 'react';
import { getComputer,deleteComputers} from '../../containers/computer/Computers.hook'
import  Computer  from './Computer'
import Table from 'react-bootstrap/Table'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../Footer/footer';
import Badge from 'react-bootstrap/Badge'

export function Computers({editRow}) {

  //state for adding mode and editing mode
  const [addingMode, setAdding] = useState(false);
  const [EditingMode, setEditingMode] = useState(false);
  //initial inputs form : we use it in editing form
  const initialEditingForm = { id: null, name: '', introduced: '', discontinued: '', companyDTO: { id: null, name: '' } };
  //initial state for computer
  const [currentComputer, setCurrentComputer] = useState(initialEditingForm);

  const [page,setPage]=useState({search:'',limite:10,actPage:1})
  const [computers,setComputers]=useState({listComputer:[],nbComputer:0})
  const [maxPage,setmaxpage]=useState(1)
  let ids=[]
  
  function recupererActualPage(actual){
    setPage({ ...page,actPage:actual })
    getComputer(page).then(
      response => {
        setComputers(response.data || [])
      }
    )
  }

  function recupererLimite(mylimit) {
    setPage({ ...page,actPage:1, limite: mylimit })
    var resulte = Math.round(computers.nbComputer / mylimit)
    setmaxpage(resulte)
  }
  
  useEffect(() =>{
    getComputer(page).then(
      response => {
        setComputers(response.data || [])
        setmaxpage(Math.round(response.data.nbComputer / page.limite))
      }
    )
  }
  , [page])

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  function checkFun(id) {
    if (!ids.includes(id)) {
      ids.push(id);
    } else {
      ids = arrayRemove(ids, id);
    }
  }

  function deleteFunction() {
    deleteComputers(ids)
    ids = []
    getComputer(page).then(response => {
      setComputers(response.data || [])
    })
  }

  function addComputer(computer) {
    setAdding(false);
    computer.id = computers.length + 1;
    computers.push(computer)
    console.log(computers);
  }

  function editRow(computer) {
    setAdding(false);
    setEditingMode(true);
    setCurrentComputer({
      id: computer.id,
      name: computer.name,
      introduced: computer.introduced,
      discontinued: computer.discontinued
    })
  }

  function editComputer(id, updatedComputer) {
    console.log('im inediting')
    setComputers(computers.map(computer => (computer.id === id ? updatedComputer : computer)))
    setEditingMode(false)
  }

  function searchComputer() {
    getComputer(page).then(
      response => {
        setComputers(response.data || [])
      }
    )
  }

  return (
    <div>
    {
      !addingMode && !EditingMode ?
      <>
      <Row>
      <Col sm={3}>
      </Col>
      <Col sm={4}>
      <input  style={{ width: "3000px", align: "center" }} size="sm" type="text" placeholder="Veuillez saisir un computer name" onChange={event => setPage({...page,search:event.target.value})} />
      </Col>
      <Col sm={4}>
      <Button size="lg" style={{ color: 'white', backgroundColor: '#17a2b8', borderColor:'#17a2b8'}} variant="secondary" type="submit" className="btn btn-secondary float-right" onClick={() => setAdding(!addingMode)}>Add Computer</Button>
      </Col>
      </Row>
     
     <br />
     <Row>
     <Col sm={2}>
     </Col>
     <Col sm={5}>
          <h3>
            Nombre d'ordinateurs : 
            <Badge variant="danger">{computers.nbComputer} </Badge>
          </h3>
    </Col>
    </Row>          
            <br />
            <Table striped bordered hover style={{marginLeft:'auto',marginRight:'auto',width:'90%'}}>

              <thead>
                <tr>
                  <th>#  <FontAwesomeIcon icon={faTrash} onClick={() => deleteFunction()} /> </th>
                  <th>Name</th>
                  <th>Introduced</th>
                  <th>Discontinued</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {computers.listComputer.map(computer =>
                  <Computer computer={computer}
                    key={computer.id}
                    edit={editRow}
                    checkFun={checkFun}
                  />
                )}
              </tbody>
            </Table>
          <Footer recupererLimite={recupererLimite} 
          maxPage={maxPage} 
          recupererActualPage={recupererActualPage} 
          limite={page.limite}/>
          </>
          : addingMode ?
            <>
              <AddComputer addComputer={addComputer} />
            </>
            :
            <>
              <EditComputer updateComputer={editComputer} currentComputer={currentComputer} />
            </>
      }

    </div>
  )
}