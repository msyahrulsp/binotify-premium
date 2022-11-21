import {
  Button,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
// @ts-ignore
import { useTable, usePagination } from 'react-table'

const SongList = () => {
  /**
   * penyanyi dapat melihat daftar lagu-lagu premium miliknya
   * dapat diakses penyanyi untuk mengelola lagu-lagu mereka
   * penyanyi dapat menambah, menghapus, mengubah lagu-lagu premium yang ditawarkan
   * lagu-lagu yang dapat dikelola seorang penyanyi adalah lagu-lagu mereka sendiri, penyanyi tidak dapat mengelola lagu penyanyi lain
   * Field yang dapat diedit oleh penyanyi adalah judul dan juga file audio lagu tersebut
   * pagination pada halaman ini dengan jumlah lagu per halaman yang kalian tentukan sendiri. Pagination boleh diimplementasikan secara server-side maupun client-side
   */
  const { singerid } = useParams()
  const navigate = useNavigate();

  const [songs, setSongs] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const fetchSongs = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:3000/singer/${singerid}/songs`
      )
      setSongs(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const data = useMemo(() => songs, [songs])

  const handleSelectSong = (songID) => {
    // handler for selected song to redirect to edit page
    navigate(`/singer/${singerid}/songs/${songID}`)
  }

  const columns = useMemo(
    () => [
      {
        Header: '',
        id: 'index',
        accessor: (_row: any, i: number) => i + 1,
      },
      {
        Header: 'Song ID',
        accessor: 'song_id',
      },
      {
        Header: 'Judul',
        accessor: 'judul',
      },
      {
        Header: 'Song Path',
        accessor: 'audio_path',
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: (props) => (
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => handleSelectSong(props.row.values.song_id)}
          >
            Edit
          </Button>
        ),
      },
    ],
    []
  )

  const tableInstance = useTable({ columns, data }, usePagination)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageCount,
    gotoPage,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance

  return (
    <Flex flexGrow={1} justifyContent="flex-start" flexDirection="column">
      <Text fontSize="3xl" mb={4}>
        Daftar Lagu Premium
      </Text>
      <TableContainer>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <Flex p={2} justifyContent="space-between">
          <HStack>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </Button>{' '}
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'<'}
            </Button>{' '}
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {'>'}
            </Button>{' '}
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </Button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
          </HStack>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Flex>
      </TableContainer>
    </Flex>
  )
}

export default SongList
