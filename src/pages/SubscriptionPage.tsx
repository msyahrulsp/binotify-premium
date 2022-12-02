import { Center, Flex, Text, useToast, VStack, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ISubscription } from '../@types/api';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination/Pagination';
import { usePagination } from '../components/Pagination/PaginationUtil';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { Access, useRole } from '../hooks/useRole';
import { getDataAPI, putDataAPI } from '../util/api';

import SpongebobGIF from '../assets/spongebob.gif';

export enum StatusUpdate {
  ACCEPT = 'ACCEPTED',
  REJECT = 'REJECTED'
}

export const SubscriptionPage = () => {
  const { haveAccess } = useRole(Access.ADMIN);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reqList, setReqList] = useState<ISubscription[]>([]);
  const [page, setPage] = useState<number>(1);
  const toast = useToast();
  const pagination = usePagination({
    totalItem: reqList.length,
    page,
    items: reqList,
    itemsPerPage: 5
  });

  const handleUpdate = async (
    creator_id: number,
    subscriber_id: number,
    status: string
  ) => {
    const payload = {
      creator_id,
      subscriber_id,
      status
    };

    try {
      const response = await putDataAPI('/subscription', {
        payload
      });
      toast({
        title: 'Success',
        description: response.message,
        status: 'success',
        position: 'top',
        isClosable: true
      });
      const newReqList = reqList.filter(
        (req) =>
          req.creator_id !== creator_id || req.subscriber_id !== subscriber_id
      );
      setReqList(newReqList);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.response?.data?.message ?? err.message,
        status: 'error',
        position: 'top',
        isClosable: true
      });
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = 'Subscription - Binotify Premium';

    const fetchData = async () => {
      try {
        const { data } = await getDataAPI('/subscription', {});
        setReqList(data);
      } catch (err: any) {
        toast({
          title: 'Error',
          description: err?.response?.data?.message ?? err.message,
          status: 'error',
          position: 'top',
          isClosable: true
        });
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (!haveAccess || isLoading) return <Loading />;

  return (
    <Flex minH='80vh' flexDirection='column' alignItems='center'>
      <Text as='b' fontSize='2xl' align='center'>
        Subscription List Request
      </Text>
      <VStack spacing={5} mt={5} w='100%'>
        {pagination.pageItems.length > 0 ? (
          pagination.pageItems.map((item: ISubscription, index: number) => {
            return (
              <SubscriptionCard
                key={index}
                {...item}
                handleUpdate={handleUpdate}
              />
            );
          })
        ) : (
          <Center w='100%' minH='60vh' flexDir='column'>
            <Image
              userSelect='none'
              boxSize='300px'
              objectFit='cover'
              src={SpongebobGIF}
              alt='logo'
              borderRadius='lg'
              cursor='pointer'
              transition='all 0.25s ease-in-out'
              _hover={{
                transform: 'scale(1.1)',
                boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.5)'
              }}
            />
            <Text as='b' fontSize='xl' opacity='0.6' mt={6} align='center'>
              Hmm, yes. Tidak ada data.
              <br />
              SELAMAT ISTIRAHAT
            </Text>
          </Center>
        )}
      </VStack>
      <Center>
        <Pagination {...pagination} onPageChange={(page) => setPage(page)} />
      </Center>
    </Flex>
  );
};
