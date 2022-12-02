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
  Text,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
// @ts-ignore
import { useTable, usePagination } from 'react-table';
import { Access, useRole } from '../../hooks/useRole';
import { Loading } from '../../components/Loading';
import { FaPlus } from 'react-icons/fa';
import AddSongModal from '../../components/Modal/AddSongModal';
import EditSongModal from '../../components/Modal/EditSongModal';

const SongList = () => {
  const { singerid } = useParams();
  const { haveAccess } = useRole(Access.SINGER);

  const [songs, setSongs] = useState([]);
  const toast = useToast();

  const baseUrl = import.meta.env.VITE_BASE_REST_URL;

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${baseUrl}/singer/${singerid}/songs`);
      setSongs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    document.title = 'Manage Song - Binotify Premium';
    fetchSongs();
  }, []);

  const data = useMemo(() => songs, [songs]);

  const addSongToDB = async (
    judul: string,
    audio_path: string,
    penyanyi_id: any
  ) => {
    try {
      const payload = {
        judul: judul,
        audio_path: audio_path,
        penyanyi_id: penyanyi_id
      };
      const { data } = await axios.post(
        `${baseUrl}/singer/${singerid}/songs`,
        payload
      );
      // @ts-ignore
      setSongs([...songs, data.data]);

      toast({
        title: 'Success',
        status: 'success',
        description: 'Berhasil menambah lagu',
        position: 'top',
        isClosable: true
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data.message ?? err.message,
        status: 'error',
        position: 'top',
        isClosable: true
      });
      console.error(err);
    }
  };

  const saveSongToDB = async (
    songTitle: string,
    songPath: string,
    singerid: any,
    songid: any
  ) => {
    const payload = {
      // @ts-ignore
      song_id: parseInt(songid),
      judul: songTitle,
      penyanyi_id: singerid,
      audio_path: songPath
    };
    try {
      await axios.put(`${baseUrl}/singer/${singerid}/songs/${songid}`, payload);
      setSongs((prevState: any) => {
        const newState = prevState.map((song: any) => {
          if (song.song_id === songid) {
            return { song_id: songid, judul: songTitle, audio_path: songPath };
          }
          return song;
        });
        return newState;
      });

      toast({
        title: 'Success',
        status: 'success',
        description: 'Berhasil mengubah lagu',
        position: 'top',
        isClosable: true
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data.message ?? err.message,
        status: 'error',
        position: 'top',
        isClosable: true
      });
      console.error(err);
    }
  };

  const handleDeleteSong = async (songID: any) => {
    // handler to delete song
    try {
      const res = await axios.delete(
        `${baseUrl}/singer/${singerid}/songs/${songID}`
      );

      setSongs((prevState) =>
        // @ts-ignore
        prevState.filter((prevState) => prevState.song_id !== songID)
      );

      toast({
        title: 'Success',
        status: 'success',
        description: 'Berhasil menghapus lagu',
        position: 'top',
        isClosable: true
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data.message ?? err.message,
        status: 'error',
        position: 'top',
        isClosable: true
      });
      console.error(err);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: '',
        id: 'index',
        accessor: (_row: any, i: number) => i + 1
      },
      {
        Header: '_Song ID',
        accessor: 'song_id'
      },
      {
        Header: 'Judul',
        accessor: 'judul'
      },
      {
        Header: 'Song Path',
        accessor: 'audio_path'
      },
      {
        Header: '',
        accessor: 'action',
        Cell: (props: any) => (
          <HStack whiteSpace='unset'>
            <EditSongModal
              title={props.row.values.judul}
              path={props.row.values.audio_path}
              songid={props.row.values.song_id}
              saveSongToDB={saveSongToDB}
            >
              <Button colorScheme='green' size='sm' mr={2} w='75px'>
                Edit
              </Button>
            </EditSongModal>
            <Button
              colorScheme='red'
              size='sm'
              onClick={() => handleDeleteSong(props.row.values.song_id)}
              w='75px'
            >
              Delete
            </Button>
          </HStack>
        )
      }
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['song_id']
      }
    },
    usePagination
  );

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
    state: { pageIndex, pageSize }
  } = tableInstance;

  if (!haveAccess) return <Loading />;

  return (
    <Flex
      flexGrow={1}
      justifyContent='flex-start'
      flexDirection='column'
      maxW='container.lg'
      margin='auto'
      w='full'
      paddingBottom={10}
    >
      <HStack spacing={4} mb={4}>
        <Text fontSize='3xl'>Daftar Lagu Premium</Text>
        <AddSongModal addSongToDB={addSongToDB}>
          <Button
            colorScheme='teal'
            size='sm'
            boxShadow='2px 3px 3px -1px rgba(0,0,0,0.75)'
          >
            <FaPlus size={10} />
          </Button>
        </AddSongModal>
      </HStack>
      <TableContainer>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup: any) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <Td
                        whiteSpace='normal'
                        wordBreak='break-all'
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex p={2} justifyContent='space-between'>
          <HStack>
            <Button
              colorScheme='teal'
              size='sm'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </Button>{' '}
            <Button
              colorScheme='teal'
              size='sm'
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'<'}
            </Button>{' '}
            <Button
              colorScheme='teal'
              size='sm'
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {'>'}
            </Button>{' '}
            <Button
              colorScheme='teal'
              size='sm'
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
            style={{ background: 'transparent' }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
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
  );
};

export default SongList;
