import ModalUpdate from './ModalUpdateTag';
import ModalDelete from './ModalDeleteTag';
import { getSearchTag } from '@/lib/fetch/tagFetch/tagFetch';
import ModalError from '../ModalError';


const TableTagTag = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const { count, rows , error } = await getSearchTag(query, currentPage);

  if(error){
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
            <th>Categoria</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((tag) => (
            <tr key={tag.id} className="m-2 p-2">
              <td>{tag.id}</td>
              <td>{tag.name}</td>
              <td>{tag.category}</td>
              <td>
                <ModalUpdate idTag={tag.id} />
              </td>
              <td>
                <ModalDelete idTag={tag.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTagTag;