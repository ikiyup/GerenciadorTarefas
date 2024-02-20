import { useState, useEffect } from 'react';
import { Box, Center, Flex, FormControl, Stack, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import api from '../../api';

function Home() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getClients() {
            const response = await api.get('orders/expires');
            setOrders(response.data);
        }

        getClients();
    }, []);


    return (
        <Box h="100vh" display="flex" flexDir="column">
            <Center
                as="header"
                h={350}
                bg="gray.400"
                color="black"
                fontWeight="bold"
                fontSize="4xl"
                pb="8"
            />
            <Flex
                align="center"
                justify="center"
                bg="blackAlpha.200"
                h="calc(100vh - 150px)"
            >
                <Center
                    w="100%"
                    maxW={840}
                    bg="white"
                    top={100}
                    position="absolute"
                    borderRadius={5}
                    p="6"
                    boxShadow="0 1px 2px #ccc"
                >
                    <FormControl display="flex" flexDir="column" gap="4">
                        <Stack direction="row">
                            <Breadcrumb fontWeight='medium' fontSize="md">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='#'>Home - Pedidos proximos do vencimento</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Breadcrumb>

                        </Stack>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead bgColor="#D9D9D9">
                                    <Tr>
                                        <Th textAlign="center">Nome</Th>
                                        <Th textAlign="center">Telefone</Th>
                                        <Th textAlign="center">Categoria</Th>
                                        <Th textAlign="center">Data da compra</Th>
                                        <Th textAlign="center">Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {orders.map(order => (
                                        <Tr key={order.id}>
                                            <Td textAlign="center"> {order.client.nome}</Td>
                                            <Td textAlign="center"> {order.client.whatsapp}</Td>
                                            <Td textAlign="center"> {order.categoria.nome}</Td>
                                            <Td textAlign="center"> {new Date(order.date).toLocaleDateString()}</Td>
                                            <Td textAlign="center">
                                                <Flex justifycontent="space-between">
                                                    <Button size="sm" fontSize="smaller" colorScheme="blue" mr={2} onClick={() => {
                                                        window.location.href = `/app/cadastro/vendas/${order.id}`
                                                    }}>Editar</Button>
                                                    <Button size="sm" fontSize="smaller" colorScheme="red">Remover</Button>
                                                </Flex>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </FormControl>
                </Center>
            </Flex>
        </Box>
    );
}

export default Home;
