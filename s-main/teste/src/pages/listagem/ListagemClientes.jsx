import { useEffect, useState } from "react";
import { Text, Input, HStack, Radio, FormLabel, RadioGroup, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Flex, Box, Center, FormControl, Button, Stack, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import api from "../../api";

const ListagemClientes = () => {
  const [clients, setClients] = useState([])
  const ver = useDisclosure()
  const edit = useDisclosure()
  const remove = useDisclosure()
  const [client, setClient] = useState({})

  useEffect(() => {
    async function getClients() {
      const response = await api.get('clients');
      setClients(response.data);
    }

    getClients();
  }, []);

  return (
    <>
      <Modal isOpen={ver.isOpen} onClose={ver.onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informações do Cliente</ModalHeader>
          <ModalBody>
            <Stack direction="row">
              <Box>
                <Box fontWeight="bold">ID:</Box>
                <Box fontWeight="bold">Nome:</Box>
                <Box fontWeight="bold">Usuário:</Box>
                <Box fontWeight="bold">CPF:</Box>
                <Box fontWeight="bold">Telefone:</Box>
                <Box fontWeight="bold">Endereço:</Box>
                <Box fontWeight="bold">Cidade:</Box>
                <Box fontWeight="bold">Bloco:</Box>
                <Box fontWeight="bold">CEP:</Box>
                <Box fontWeight="bold">Sexo:</Box>
              </Box>
              <Box>
                <Box>{client.id}</Box>
                <Box>{client.nome}</Box>
                <Box>{client.username}</Box>
                <Box>{client.cpf}</Box>
                <Box>{client.whatsapp}</Box>
                <Box>{client.endereco}</Box>
                <Box>{client.cidade}</Box>
                <Box>{client.bloco}</Box>
                <Box>{client.cep}</Box>
                <Box>{client.sexo}</Box>
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
          <ModalHeader>Editar Cliente</ModalHeader>
          <ModalBody>
              <form onSubmit={(e) => {
                e.preventDefault();
              }}>
                <span>ID: {client.id}</span>
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" value={client.nome} onChange={(e) => setClient({ ...client, nome: e.target.value })} />
                  <FormLabel>Usuário</FormLabel>
                  <Input type="text" value={client.username} onChange={(e) => setClient({ ...client, username: e.target.value })} />
                  <FormLabel>CPF</FormLabel>
                  <Input type="text" value={client.cpf} onChange={(e) => setClient({ ...client, cpf: e.target.value })} />
                  <FormLabel>Telefone</FormLabel>
                  <Input type="text" value={client.whatsapp} onChange={(e) => setClient({ ...client, whatsapp: e.target.value })} />
                  <FormLabel>Endereço</FormLabel>
                  <Input type="text" value={client.endereco} onChange={(e) => setClient({ ...client, endereco: e.target.value })} />
                  <FormLabel>Cidade</FormLabel>
                  <Input type="text" value={client.cidade} onChange={(e) => setClient({ ...client, cidade: e.target.value })} />
                  <FormLabel>Bloco</FormLabel>
                  <Input type="text" value={client.bloco} onChange={(e) => setClient({ ...client, bloco: e.target.value })} />
                  <FormLabel>CEP</FormLabel>
                  <Input type="text" value={client.cep} onChange={(e) => setClient({ ...client, cep: e.target.value })} />
                  <FormLabel>Sexo</FormLabel>
                  <RadioGroup defaultValue={client.sexo} onChange={(e) => setClient({ ...client, sexo: e })}>
                    <HStack spacing="24px">
                      <Radio value="MASCULINO">Masculino</Radio>
                      <Radio value="FEMININO">Feminino</Radio>
                    </HStack>
                  </RadioGroup >
                </FormControl>
              </form>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={edit.onClose}>
              Fechar
            </Button>
            <Button colorScheme="blue" onClick={() => {
              edit.onClose();
              api.put(`clients/${client.id}`, client).then(() => {
                window.location.reload();
              });
            }}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={remove.isOpen} onClose={remove.onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remover Cliente</ModalHeader>
          <ModalBody>
            <Text>
              Tem certeza que deseja remover o cliente {client.nome}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={remove.onClose}>
              Fechar
            </Button>
            <Button colorScheme="red" onClick={() => {
              remove.onClose();
              api.delete(`clients/${client.id}`).then(() => {
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
            maxW={840}
            bg="white"
            top={100}
            position="absolute"
            borderRadius={5}
            p="6"
            boxShadow="0 1px 2px #ccc"
          >
            <FormControl display="flex" flexDir="column" gap="4">
              <Stack direction="row-reverse">
                <Button size='md' colorScheme='blue' alignSelf="flex-end" onClick={() => window.location.href = '/app/cadastro/clientes'}>Cadastrar Cliente</Button>
              </Stack>
              <Stack direction="row">
                <Breadcrumb fontWeight='medium' fontSize="md">
                  <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Listagem Cliente</BreadcrumbLink>
                  </BreadcrumbItem>

                </Breadcrumb>
              </Stack>
              <TableContainer>
                <Table variant='simple'>
                  <Thead bgColor="#D9D9D9">
                    <Tr>
                      <Th textAlign="center">Nome</Th>
                      <Th textAlign="center">CPF</Th>
                      <Th textAlign="center">Telefone</Th>
                      <Th textAlign="center">Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {clients.length > 0 && clients.map(client => (
                      <Tr key={client.id}>
                        <Td textAlign="center"> {client.nome}</Td>
                        <Td textAlign="center"> {client.cpf} </Td>
                        <Td textAlign="center"> {client.whatsapp}</Td>
                        <Td textAlign="center">
                          <Flex justifycontent="space-between">
                            <Button size="sm" fontSize="smaller" colorScheme="green" mr="2" onClick={() => {
                              setClient(client);
                              edit.onOpen();
                            }}> Editar </Button>
                            <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => {
                              setClient(client);
                              remove.onOpen();
                            }}> Remover </Button>
                            <Button size="sm" fontSize="smaller" colorScheme="blue" ml="2" onClick={() => {
                              setClient(client);
                              ver.onOpen();
                            }}> Ver </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    )) || <Tr><Td colSpan="4" textAlign="center">Nenhum cliente cadastrado</Td></Tr>}
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

export default ListagemClientes;




