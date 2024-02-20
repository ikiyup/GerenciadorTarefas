import { useEffect, useState } from "react";
import { Textarea, Text, Input, FormLabel, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Flex, Box, Center, FormControl, Button, Stack, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Select } from "@chakra-ui/react";
import api from "../../api";

const ListagemVendas = () => {
  const ver = useDisclosure()
  const edit = useDisclosure()
  const remove = useDisclosure()
  const pesquisa = useDisclosure()
  const [orders, setOrders] = useState([])
  const [client, setClient] = useState({
    id: '',
    nome: '',
    username: '',
    cpf: '',
    whatsapp: ''
  })
  const [busca, setBusca] = useState('')
  const [result, setResult] = useState([])
  const [categories, setCategories] = useState([])
  const [order, setOrder] = useState({
    id: '',
    codVenda: '',
    date: Date.now(),
    categoria: {
      id: '',
      nome: ''
    },
    valor: '',
    comentario: '',
    client: {
      id: '',
      nome: '',
      username: '',
      cpf: '',
      whatsapp: ''
    }
  })

  const buscar = (e) => {
    e.preventDefault()

    api.get('clients', {
      params: {
        nome: busca
      }
    }).then((response) => {
      setResult(response.data)
    })
  }

  useEffect(() => {
    async function getClients() {
      const response = await api.get('orders');
      setOrders(response.data);
    }

    async function getCategories() {
      const response = await api.get('categories');
      setCategories(response.data);
    }

    getClients();
    getCategories();
  }, []);

  return (
    <>
      <Modal isOpen={pesquisa.isOpen} onClose={pesquisa.onClose}
        size="full"
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Busca de Cliente</ModalHeader>
          <ModalBody
            display="flex"
            flexDir="column"
          >
            <form onSubmit={buscar}>
              <Box
                w="100%"
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                gap={4}
              >
                <Input type="text" placeholder="Digite o nome do cliente" onChange={(e) => {
                  setBusca(e.target.value)
                  buscar(e)
                }} />
                <Button
                  colorScheme="blue"
                >Buscar</Button>
              </Box>
            </form>
            <TableContainer
              mt={4}
              h="250px"
              overflowY="scroll"
              overflowX="hidden"
            >
              <Table variant='simple'>
                <Thead bgColor="#D9D9D9">
                  <Tr>
                    <Th textAlign="center">Nome</Th>
                    <Th textAlign="center">Usuário</Th>
                    <Th textAlign="center">CPF</Th>
                    <Th textAlign="center">WhatsApp</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {result && result.map((client) => (
                    <Tr
                      key={client.id}
                      cursor="pointer"
                      _hover={{ bgColor: "gray.100" }}
                      onClick={() => {
                        setClient(client)
                        pesquisa.onClose()
                      }}
                    >
                      <Td textAlign="center">{client.nome}</Td>
                      <Td textAlign="center">{client.username}</Td>
                      <Td textAlign="center">{client.cpf}</Td>
                      <Td textAlign="center">{client.whatsapp}</Td>
                    </Tr>
                  ))}
                </Tbody>

              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={pesquisa.onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={ver.isOpen} onClose={ver.onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informações do Pedido</ModalHeader>
          <ModalBody>
            <Stack direction="row">
              <Box>
                <Box fontWeight="bold">ID:</Box>
                <Box fontWeight="bold">Cliente:</Box>
                <Box fontWeight="bold">Data:</Box>
                <Box fontWeight="bold">Categoria:</Box>
                <Box fontWeight="bold">Valor:</Box>
                <Box fontWeight="bold">Comentário:</Box>
              </Box>
              <Box>
                <Box>{order.id}</Box>
                <Box>{order.client.nome}</Box>
                <Box>{new Date(order.date).toLocaleDateString()}</Box>
                <Box>{order.categoria.nome}</Box>
                <Box>{order.valor}</Box>
                <Box>{order.comentario}</Box>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={ver.onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={edit.isOpen} onClose={edit.onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Pedido</ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => {
              e.preventDefault();
            }}>
              <span>ID: {order.id}</span>
              <FormControl>
                <FormLabel>Cliente</FormLabel>
                <Input type="text" value={client.nome || order.client.nome} onClick={pesquisa.onOpen} readOnly />

                <FormLabel>Código da Venda</FormLabel>
                <Input type="text" value={order.codVenda} onChange={(e) => setOrder({ ...order, codVenda: e.target.value })} />

                <FormLabel>Data</FormLabel>
                <Input type="date" onChange={(e) => setOrder({ ...order, date: e.target.value })} value={new Date(order.date).toISOString().split('T')[0]} />

                <FormLabel>Categoria</FormLabel>
                <Select defaultValue={order.categoria.id} onChange={(e) => setOrder({ ...order, categoria: { id: e.target.value } })}>
                  {categories && categories.map((category) => (
                    <option key={category.id} value={category.id} onClick={() => setOrder({ ...order, categoria: category })}>{category.nome}</option>
                  ))}
                </Select>

                <FormLabel>Valor</FormLabel>
                <Input type="number" value={order.valor} onChange={(e) => setOrder({ ...order, valor: e.target.value })} />

                <FormLabel>Comentário</FormLabel>
                <Textarea value={order.comentario} onChange={(e) => setOrder({ ...order, comentario: e.target.value })} />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={edit.onClose}>
              Fechar
            </Button>
            <Button colorScheme="blue" onClick={() => {
              edit.onClose();
              api.put(`orders/${order.id}`, {
                codVenda: order.codVenda,
                date: new Date(order.date),
                categoria: order.categoria.id,
                valor: order.valor,
                comentario: order.comentario,
                client: client.id || order.client.id
              }).then(() => {
                window.location.reload();
              });
            }}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={remove.isOpen} onClose={remove.onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remover Pedido</ModalHeader>
          <ModalBody>
            <Text>
              Tem certeza que deseja remover o pedido {order.id}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={remove.onClose}>
              Fechar
            </Button>
            <Button colorScheme="red" onClick={() => {
              remove.onClose();
              console.log(order.id);
              api.delete(`orders/${order.id}`).then(() => {
                window.location.reload();
              });
            }}>Remover</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
            maxW={940}
            bg="white"
            top={100}
            position="absolute"
            borderRadius={5}
            p="6"
            boxShadow="0 1px 2px #ccc"
          >
            <FormControl display="flex" flexDir="column" gap="4">
              <Stack direction="row-reverse">
                <Button size='md' colorScheme='blue' alignSelf="flex-end" onClick={() => window.location.href = '/app/cadastro/vendas'}>Cadastrar Pedido</Button>
              </Stack>
              <Stack direction="row">
                <Breadcrumb fontWeight='medium' fontSize="md">
                  <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Listagem Pedidos</BreadcrumbLink>
                  </BreadcrumbItem>

                </Breadcrumb>
              </Stack>
              <TableContainer>
                <Table variant='simple'>
                  <Thead bgColor="#D9D9D9">
                    <Tr>
                      <Th textAlign="center">Cliente</Th>
                      <Th textAlign="center">Cód. Venda</Th>
                      <Th textAlign="center">Data</Th>
                      <Th textAlign="center">Categoria</Th>
                      <Th textAlign="center">Valor</Th>
                      <Th textAlign="center">Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders.length > 0 && orders.map(or => (
                      <Tr key={or.id}>
                        <Td textAlign="center"> {or.client.nome}</Td>
                        <Td textAlign="center"> {or.codVenda}</Td>
                        <Td textAlign="center"> {new Date(or.date).toLocaleDateString()}</Td>
                        <Td textAlign="center"> {or.categoria.nome}</Td>
                        <Td textAlign="center"> R$ {or.valor}</Td>
                        <Td textAlign="center">
                          <Flex justifycontent="space-between">
                            <Button size="sm" fontSize="smaller" colorScheme="green" mr="2" onClick={() => {
                              setOrder(or);
                              edit.onOpen();
                            }}> Editar </Button>
                            <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => {
                              setOrder(or);
                              remove.onOpen();
                            }}> Remover </Button>
                            <Button size="sm" fontSize="smaller" colorScheme="blue" ml="2" onClick={() => {
                              setOrder(or);
                              ver.onOpen();
                            }}> Ver </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    )) || <Tr><Td colSpan="6" textAlign="center">Nenhum pedido encontrado</Td></Tr>}
                  </Tbody>

                </Table>
              </TableContainer>
            </FormControl>
          </Center>
        </Flex>
      </Box>
    </>
  );
}

export default ListagemVendas;
