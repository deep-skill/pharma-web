import { getAllProduct } from "@/lib/fetch/productFetch/productFetch";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalError from "../ModalError";


const TableProduct = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const { products , error}  = await getAllProduct(query , currentPage)
  if(error !== ''){
    return <div>
      <ModalError error={error.message}/>
    </div>
  }
  
  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Prescripcion</th>
            <th>Marca</th>
            <th>Etiqueta</th>
            <th>Editar</th>
            <th>Eliminado</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.prescription_required === 1 ? 'Requerida' : 'No Requerida'}</td>
              <td>{product.brand?.name}</td>
              <td>{product.tags?.toString()}</td>
              <td><ModalUpdateProduct idProduct={product.id}/></td>
              <td><ModalDeleteProduct idProduct={product.id}/></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default TableProduct;
