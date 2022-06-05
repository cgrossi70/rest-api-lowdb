import db from "../database.js"
import { v4 as uuidv4 } from 'uuid';


const ctrl = {}

ctrl.addAuthor = async (req, res) => {

  await db.read()
  // Si no hay data lo inicializo
  db.data ||= { books: [], authors: [] }

  const { name } = req.body

  // Chequeo que no exista ya
  const index = db.data.authors.findIndex(author => author.name === name)
  if(index != -1) return res.send("Author already exists !!!!")


  // Lo guardo en el array
  const register = {
    'id': uuidv4(), 
    'name': name
  }
  db.data.authors.push(register)

  //Escribo la base de datos
  await db.write()
  res.send(register)
}

ctrl.listAuthor = async (req, res) => {
  await db.read()
  console.log(req.params.id)
  const result = db.data.authors.filter(author => author.id === req.params.id)
  res.send(result)
}

ctrl.listAuthors = async (req, res) => {
  await db.read()
  res.send(db.data)
}

ctrl.deleteAuthor = async (req, res) => {
  await db.read()

  const id = req.params.id
  
  // Busco el id
  const index = db.data.authors.findIndex(author => author.id === id)
  
  // Si no existiese retorno el mensaje
  if(index === -1) return res.send("Author not exists !!!!")


  // Si existe borro el id 
  db.data.authors.splice(index,1)

  await db.write()
  res.send('Author succesfully deleted')
}

ctrl.updateAuthor = async (req, res) => {
  const id    = req.params.id
  const name  = req.body.name
  
  await db.read()

  // Verifico que exista el id
  const index = db.data.authors.findIndex(author => author.id === id)
  
  // Si no existiese retorno el mensaje
  if(index === -1) return res.send("Author not exists !!!!")

  // Actualizo el author.
  db.data.authors[index].name = name

  db.write()
  
  res.send('Author updated sucessfully !!!!')
}

export default ctrl