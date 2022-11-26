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
import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// @ts-ignore
import { useTable, usePagination } from 'react-table'
import { MessageContext } from '../../App'
import Notification from '../../components/Notification'
import AddSong from './AddSong'

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
  const navigate = useNavigate()

  const [songs, setSongs] = useState([])
  const [isAdd, setIsAdd] = useState(true)
  const { message, setMessageContent } = useContext(MessageContext)

  const baseUrl = import.meta.env.VITE_BASE_REST_URL

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${baseUrl}/singer/${singerid}/songs`)
      setSongs(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const data = useMemo(() => songs, [songs])

  const handleAddSong = () => {
    setIsAdd(!isAdd)
  }

  const handleEditSong = (songID) => {
    // handler for selected song to redirect to edit page
    navigate(`/singer/${singerid}/songs/${songID}`)
  }

  const handleDeleteSong = async (songID) => {
    // handler to delete song
    try {
      const res = await axios.delete(
        `${baseUrl}/singer/${singerid}/songs/${songID}`
      )

      setSongs((prevState) =>
        prevState.filter((prevState) => prevState.song_id !== songID)
      )

      setMessageContent('Delete success.')
    } catch (err) {
      console.error(err)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: '',
        id: 'index',
        accessor: (_row: any, i: number) => i + 1,
      },
      {
        Header: '_Song ID',
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
        Header: '',
        accessor: 'action',
        Cell: (props) => (
          <>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => handleEditSong(props.row.values.song_id)}
              mr={2}
            >
              Edit
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => handleDeleteSong(props.row.values.song_id)}
            >
              Delete
            </Button>
          </>
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
      <Notification message={message} />
      <Text fontSize="3xl" mb={4}>
        Daftar Lagu Premium
      </Text>
      <VStack align='flex-start'>
        <Button onClick={handleAddSong} colorScheme="teal" size="sm">
          Tambah Lagu
        </Button>
        {isAdd ? <AddSong/> : null}
      </VStack>
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
