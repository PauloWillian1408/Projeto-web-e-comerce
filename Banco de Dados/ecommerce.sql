-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/11/2025 às 00:17
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `carrinho`
--

CREATE TABLE `carrinho` (
  `id_carrinho` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `quantidade` int(11) DEFAULT 1,
  `data_adicao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nome_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nome_categoria`) VALUES
(8, 'Papetes Ana Bella'),
(14, 'Papetes Canoa'),
(11, 'Papetes Flat'),
(13, 'Papetes Glamour Luxo'),
(16, 'Papetes New Baixa'),
(15, 'Papetes Pop Baixa'),
(10, 'Papetes Pranch'),
(9, 'Papetes Redonda'),
(12, 'Papetes Traturadoras'),
(5, 'Plataforma Artesanal'),
(6, 'Plataforma Blogueira'),
(7, 'Plataforma Luxo'),
(17, 'Saltos Cristal'),
(18, 'Saltos Fino'),
(21, 'Saltos Griff'),
(22, 'Saltos Gringa'),
(20, 'Saltos Tábua'),
(19, 'Saltos Taça'),
(3, 'sapatos');

-- --------------------------------------------------------

--
-- Estrutura para tabela `itens_pedido`
--

CREATE TABLE `itens_pedido` (
  `id_item` int(11) NOT NULL,
  `id_venda` int(11) DEFAULT NULL,
  `id_produto` int(11) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id_produto` int(11) NOT NULL,
  `nome_produto` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `descricao` text DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `estoque` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id_produto`, `nome_produto`, `preco`, `descricao`, `imagem`, `categoria_id`, `estoque`) VALUES
(855, 'Papete Ana Bella 01', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella01.jpeg', 8, 12),
(856, 'Papete Ana Bella 02', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella02.jpeg', 8, 25),
(857, 'Papete Ana Bella 03', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella03.jpeg', 8, 18),
(858, 'Papete Ana Bella 04', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella04.jpeg', 8, 7),
(859, 'Papete Ana Bella 05', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella05.jpeg', 8, 22),
(860, 'Papete Ana Bella 06', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella06.jpeg', 8, 15),
(861, 'Papete Ana Bella 07', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella07.jpeg', 8, 10),
(862, 'Papete Ana Bella 08', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella08.jpeg', 8, 28),
(863, 'Papete Ana Bella 09', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella09.jpeg', 8, 13),
(864, 'Papete Ana Bella 10', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella10.jpeg', 8, 6),
(865, 'Papete Ana Bella 11', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella11.jpeg', 8, 20),
(866, 'Papete Ana Bella 12', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella12.jpeg', 8, 17),
(867, 'Papete Ana Bella 13', 140.00, 'Papete com solado leve e tiras com fecho ajustável.', '../html/src/papetesAnaBella/AnaBella13.jpeg', 8, 9),
(868, 'Papete Canoa 01', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa01.jpeg', 14, 21),
(869, 'Papete Canoa 02', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa02.jpeg', 14, 14),
(870, 'Papete Canoa 03', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa03.jpeg', 14, 8),
(871, 'Papete Canoa 04', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa04.jpeg', 14, 27),
(872, 'Papete Canoa 05', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa05.jpeg', 14, 11),
(873, 'Papete Canoa 06', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa06.jpeg', 14, 19),
(874, 'Papete Canoa 07', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa07.jpeg', 14, 6),
(875, 'Papete Canoa 08', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa08.jpeg', 14, 23),
(876, 'Papete Canoa 09', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa09.jpeg', 14, 16),
(877, 'Papete Canoa 10', 140.00, 'Papete de tira única larga com base confortável.', '../html/src/papetesCanoa/Canoa10.jpeg', 14, 5),
(878, 'Papete Flat 01', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat01.jpeg', 11, 26),
(879, 'Papete Flat 02', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat02.jpeg', 11, 13),
(880, 'Papete Flat 03', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat03.jpeg', 11, 19),
(881, 'Papete Flat 04', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat04.jpeg', 11, 7),
(882, 'Papete Flat 05', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat05.jpeg', 11, 28),
(883, 'Papete Flat 06', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat06.jpeg', 11, 10),
(884, 'Papete Flat 07', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat07.jpeg', 11, 24),
(885, 'Papete Flat 08', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat08.jpeg', 11, 15),
(886, 'Papete Flat 09', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat09.jpeg', 11, 8),
(887, 'Papete Flat 10', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat10.jpeg', 11, 30),
(888, 'Papete Flat 11', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat11.jpeg', 11, 12),
(889, 'Papete Flat 12', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat12.jpeg', 11, 21),
(890, 'Papete Flat 13', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat13.jpeg', 11, 17),
(891, 'Papete Flat 14', 130.00, 'Papete estilo sandália rasteira com solado liso.', '../html/src/papetesFlat/Flat14.jpeg', 11, 5),
(892, 'Papete Glamour Luxo 01', 160.00, 'Papete luxuosa com aplicações de brilho e fecho no tornozelo.', '../html/src/papetesGlamourLuxo/GlamourLuxo01.jpeg', 13, 14),
(893, 'Papete Glamour Luxo 02', 160.00, 'Papete luxuosa com aplicações de brilho e fecho no tornozelo.', '../html/src/papetesGlamourLuxo/GlamourLuxo02.jpeg', 13, 20),
(894, 'Papete Glamour Luxo 03', 160.00, 'Papete luxuosa com aplicações de brilho e fecho no tornozelo.', '../html/src/papetesGlamourLuxo/GlamourLuxo03.jpeg', 13, 11),
(895, 'Papete Glamour Luxo 04', 160.00, 'Papete luxuosa com aplicações de brilho e fecho no tornozelo.', '../html/src/papetesGlamourLuxo/GlamourLuxo04.jpeg', 13, 25),
(896, 'Papete Glamour Luxo 05', 160.00, 'Papete luxuosa com aplicações de brilho e fecho no tornozelo.', '../html/src/papetesGlamourLuxo/GlamourLuxo05.jpeg', 13, 18),
(897, 'Papete Glamour Luxo 06', 160.00, 'Papete luxuosa com aplicações de brilho e fecho no tornozelo.', '../html/src/papetesGlamourLuxo/GlamourLuxo06.jpeg', 13, 9),
(898, 'Papete Glamour Luxo 07', 160.00, 'Papete luxuosa com aplicações de brilho e fecho no tornozelo.', '../html/src/papetesGlamourLuxo/GlamourLuxo07.jpeg', 13, 29),
(899, 'Papete Glamour Luxo 08', 160.00, 'Papete luxuosa com aplicações de brilho e fecho no tornozelo.', '../html/src/papetesGlamourLuxo/GlamourLuxo08.jpeg', 13, 6),
(900, 'Papete New Baixa 01', 130.00, 'Papete moderna com solado baixo em borracha antiderrapante.', '../html/src/papetesNewBaixa/NewBaixa01.jpeg', 16, 17),
(901, 'Papete New Baixa 02', 130.00, 'Papete moderna com solado baixo em borracha antiderrapante.', '../html/src/papetesNewBaixa/NewBaixa02.jpeg', 16, 23),
(902, 'Papete New Baixa 03', 130.00, 'Papete moderna com solado baixo em borracha antiderrapante.', '../html/src/papetesNewBaixa/NewBaixa03.jpeg', 16, 10),
(903, 'Papete New Baixa 04', 130.00, 'Papete moderna com solado baixo em borracha antiderrapante.', '../html/src/papetesNewBaixa/NewBaixa04.jpeg', 16, 26),
(904, 'Papete Pop Baixa 01', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa01.jpeg', 15, 15),
(905, 'Papete Pop Baixa 02', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa02.jpeg', 15, 7),
(906, 'Papete Pop Baixa 03', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa03.jpeg', 15, 29),
(907, 'Papete Pop Baixa 04', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa04.jpeg', 15, 11),
(908, 'Papete Pop Baixa 05', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa05.jpeg', 15, 22),
(909, 'Papete Pop Baixa 06', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa06.jpeg', 15, 9),
(910, 'Papete Pop Baixa 07', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa07.jpeg', 15, 18),
(911, 'Papete Pop Baixa 08', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa08.jpeg', 15, 24),
(912, 'Papete Pop Baixa 09', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa09.jpeg', 15, 13),
(913, 'Papete Pop Baixa 10', 115.00, 'Papete simples e casual com duas tiras grossas.', '../html/src/papetesPopBaixa/PopBaixa10.jpeg', 15, 6),
(914, 'Papete Pranch 01', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch01.jpeg', 10, 20),
(915, 'Papete Pranch 02', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch02.jpeg', 10, 8),
(916, 'Papete Pranch 03', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch03.jpeg', 10, 27),
(917, 'Papete Pranch 04', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch04.jpeg', 10, 16),
(918, 'Papete Pranch 05', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch05.jpeg', 10, 11),
(919, 'Papete Pranch 06', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch06.jpeg', 10, 24),
(920, 'Papete Pranch 07', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch07.jpeg', 10, 9),
(921, 'Papete Pranch 08', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch08.jpeg', 10, 21),
(922, 'Papete Pranch 09', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch09.jpeg', 10, 14),
(923, 'Papete Pranch 10', 150.00, 'Papete de plataforma baixa com tiras cruzadas no peito do pé.', '../html/src/papetesPranch/PapetesPranch10.jpeg', 10, 6),
(924, 'Papete Redonda 01', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda01.jpeg', 9, 28),
(925, 'Papete Redonda 02', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda02.jpeg', 9, 17),
(926, 'Papete Redonda 03', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda03.jpeg', 9, 10),
(927, 'Papete Redonda 04', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda04.jpeg', 9, 25),
(928, 'Papete Redonda 05', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda05.jpeg', 9, 13),
(929, 'Papete Redonda 06', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda06.jpeg', 9, 19),
(930, 'Papete Redonda 07', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda07.jpeg', 9, 6),
(931, 'Papete Redonda 08', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda08.jpeg', 9, 22),
(932, 'Papete Redonda 09', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda09.jpeg', 9, 15),
(933, 'Papete Redonda 10', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda10.jpeg', 9, 20),
(934, 'Papete Redonda 11', 160.00, 'Papete com solado alto e robusto, estilo tratorado.', '../html/src/papetesRedonda/PapetesRedonda11.jpeg', 9, 7),
(935, 'Papete Traturadoras 01', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras01.jpeg', 12, 18),
(936, 'Papete Traturadoras 02', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras02.jpeg', 12, 12),
(937, 'Papete Traturadoras 03', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras03.jpeg', 12, 29),
(938, 'Papete Traturadoras 04', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras04.jpeg', 12, 5),
(939, 'Papete Traturadoras 05', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras05.jpeg', 12, 23),
(940, 'Papete Traturadoras 06', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras06.jpeg', 12, 16),
(941, 'Papete Traturadoras 07', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras07.jpeg', 12, 27),
(942, 'Papete Traturadoras 08', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras08.jpeg', 12, 10),
(943, 'Papete Traturadoras 09', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras09.jpeg', 12, 25),
(944, 'Papete Traturadoras 10', 150.00, 'Papete com solado tratorado robusto e visual marcante.', '../html/src/papetesTraturadoras/PapetesTraturadoras10.jpeg', 12, 7),
(945, 'Plataforma Artesanal 01', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal01.jpeg', 5, 20),
(946, 'Plataforma Artesanal 02', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal02.jpeg', 5, 14),
(947, 'Plataforma Artesanal 03', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal03.jpeg', 5, 8),
(948, 'Plataforma Artesanal 04', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal04.jpeg', 5, 26),
(949, 'Plataforma Artesanal 05', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal05.jpeg', 5, 11),
(950, 'Plataforma Artesanal 06', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal06.jpeg', 5, 19),
(951, 'Plataforma Artesanal 07', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal07.jpeg', 5, 6),
(952, 'Plataforma Artesanal 08', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal08.jpeg', 5, 23),
(953, 'Plataforma Artesanal 09', 175.00, 'Plataforma alta com acabamento artesanal em corda/juta.', '../html/src/plataformaArtesanal/PlataformaArtesanal09.jpeg', 5, 17),
(954, 'Plataforma Blogueira 01', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira01.jpeg', 6, 12),
(955, 'Plataforma Blogueira 02', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira02.jpeg', 6, 25),
(956, 'Plataforma Blogueira 03', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira03.jpeg', 6, 9),
(957, 'Plataforma Blogueira 04', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira04.jpeg', 6, 16),
(958, 'Plataforma Blogueira 05', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira05.jpeg', 6, 21),
(959, 'Plataforma Blogueira 06', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira06.jpeg', 6, 7),
(960, 'Plataforma Blogueira 07', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira07.jpeg', 6, 28),
(961, 'Plataforma Blogueira 08', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira08.jpeg', 6, 15),
(962, 'Plataforma Blogueira 09', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira09.jpeg', 6, 10),
(963, 'Plataforma Blogueira 10', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira10.jpeg', 6, 23),
(964, 'Plataforma Blogueira 11', 170.00, 'Plataforma moderna com design vibrante e tiras em vinil.', '../html/src/plataformaBlogueira/PlataformaBlogueira11.jpeg', 6, 5),
(965, 'Plataforma Luxo 01', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo01.jpeg', 7, 24),
(966, 'Plataforma Luxo 02', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo02.jpeg', 7, 18),
(967, 'Plataforma Luxo 03', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo03.jpeg', 7, 13),
(968, 'Plataforma Luxo 04', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo04.jpeg', 7, 30),
(969, 'Plataforma Luxo 05', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo05.jpeg', 7, 7),
(970, 'Plataforma Luxo 06', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo06.jpeg', 7, 22),
(971, 'Plataforma Luxo 07', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo07.jpeg', 7, 10),
(972, 'Plataforma Luxo 08', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo08.jpeg', 7, 27),
(973, 'Plataforma Luxo 09', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo09.jpeg', 7, 15),
(974, 'Plataforma Luxo 10', 160.00, 'Plataforma alta com tiras em material metalizado e detalhe em fivela.', '../html/src/plataformaLuxo/PlataformaLuxo10.jpeg', 7, 6),
(975, 'Salto Cristal 01', 160.00, 'Salto bloco com tiras em acrílico transparente (cristal).', '../html/src/saltosCristal/SaltosCristal01.jpeg', 17, 19),
(976, 'Salto Cristal 02', 160.00, 'Salto bloco com tiras em acrílico transparente (cristal).', '../html/src/saltosCristal/SaltosCristal02.jpeg', 17, 14),
(977, 'Salto Cristal 03', 160.00, 'Salto bloco com tiras em acrílico transparente (cristal).', '../html/src/saltosCristal/SaltosCristal03.jpeg', 17, 8),
(978, 'Salto Cristal 04', 160.00, 'Salto bloco com tiras em acrílico transparente (cristal).', '../html/src/saltosCristal/SaltosCristal04.jpeg', 17, 25),
(979, 'Salto Cristal 05', 160.00, 'Salto bloco com tiras em acrílico transparente (cristal).', '../html/src/saltosCristal/SaltosCristal05.jpeg', 17, 11),
(980, 'Salto Cristal 06', 160.00, 'Salto bloco com tiras em acrílico transparente (cristal).', '../html/src/saltosCristal/SaltosCristal06.jpeg', 17, 28),
(981, 'Salto Cristal 07', 160.00, 'Salto bloco com tiras em acrílico transparente (cristal).', '../html/src/saltosCristal/SaltosCristal07.jpeg', 17, 16),
(982, 'Salto Cristal 08', 160.00, 'Salto bloco com tiras em acrílico transparente (cristal).', '../html/src/saltosCristal/SaltosCristal08.jpeg', 17, 5),
(983, 'Salto Fino 01', 140.00, 'Scarpin clássico com salto alto e fino em material sintético.', '../html/src/saltosFino/SaltosFino01.jpeg', 18, 20),
(984, 'Salto Fino 02', 140.00, 'Scarpin clássico com salto alto e fino em material sintético.', '../html/src/saltosFino/SaltosFino02.jpeg', 18, 13),
(985, 'Salto Fino 03', 140.00, 'Scarpin clássico com salto alto e fino em material sintético.', '../html/src/saltosFino/SaltosFino03.jpeg', 18, 22),
(986, 'Salto Fino 04', 140.00, 'Scarpin clássico com salto alto e fino em material sintético.', '../html/src/saltosFino/SaltosFino04.jpeg', 18, 9),
(987, 'Salto Fino 05', 140.00, 'Scarpin clássico com salto alto e fino em material sintético.', '../html/src/saltosFino/SaltosFino05.jpeg', 18, 17),
(988, 'Salto Fino 06', 140.00, 'Scarpin clássico com salto alto e fino em material sintético.', '../html/src/saltosFino/SaltosFino06.jpeg', 18, 24),
(989, 'Salto Fino 07', 140.00, 'Scarpin clássico com salto alto e fino em material sintético.', '../html/src/saltosFino/SaltosFino07.jpeg', 18, 10),
(990, 'Salto Fino 08', 140.00, 'Scarpin clássico com salto alto e fino em material sintético.', '../html/src/saltosFino/SaltosFino08.jpeg', 18, 30),
(991, 'Salto Griff 01', 150.00, 'Sandália com salto bloco e tiras elegantes em verniz.', '../html/src/saltosGriff/SaltosGriff01.jpeg', 21, 15),
(992, 'Salto Griff 02', 150.00, 'Sandália com salto bloco e tiras elegantes em verniz.', '../html/src/saltosGriff/SaltosGriff02.jpeg', 21, 7),
(993, 'Salto Griff 03', 150.00, 'Sandália com salto bloco e tiras elegantes em verniz.', '../html/src/saltosGriff/SaltosGriff03.jpeg', 21, 26),
(994, 'Salto Griff 04', 150.00, 'Sandália com salto bloco e tiras elegantes em verniz.', '../html/src/saltosGriff/SaltosGriff04.jpeg', 21, 12),
(995, 'Salto Griff 05', 150.00, 'Sandália com salto bloco e tiras elegantes em verniz.', '../html/src/saltosGriff/SaltosGriff05.jpeg', 21, 19),
(996, 'Salto Griff 06', 150.00, 'Sandália com salto bloco e tiras elegantes em verniz.', '../html/src/saltosGriff/SaltosGriff06.jpeg', 21, 23),
(997, 'Salto Griff 07', 150.00, 'Sandália com salto bloco e tiras elegantes em verniz.', '../html/src/saltosGriff/SaltosGriff07.jpeg', 21, 8),
(998, 'Salto Griff 08', 150.00, 'Sandália com salto bloco e tiras elegantes em verniz.', '../html/src/saltosGriff/SaltosGriff08.jpeg', 21, 28),
(999, 'Salto Gringa 01', 160.00, 'Salto alto de bico fino com cabedal em material transparente.', '../html/src/saltosGringa/SaltosGringa01.jpeg', 22, 11),
(1000, 'Salto Gringa 02', 160.00, 'Salto alto de bico fino com cabedal em material transparente.', '../html/src/saltosGringa/SaltosGringa02.jpeg', 22, 20),
(1001, 'Salto Gringa 03', 160.00, 'Salto alto de bico fino com cabedal em material transparente.', '../html/src/saltosGringa/SaltosGringa03.jpeg', 22, 6),
(1002, 'Salto Gringa 04', 160.00, 'Salto alto de bico fino com cabedal em material transparente.', '../html/src/saltosGringa/SaltosGringa04.jpeg', 22, 29),
(1003, 'Salto Gringa 05', 160.00, 'Salto alto de bico fino com cabedal em material transparente.', '../html/src/saltosGringa/SaltosGringa05.jpeg', 22, 14),
(1004, 'Salto Gringa 06', 160.00, 'Salto alto de bico fino com cabedal em material transparente.', '../html/src/saltosGringa/SaltosGringa06.jpeg', 22, 17),
(1005, 'Salto Gringa 07', 160.00, 'Salto alto de bico fino com cabedal em material transparente.', '../html/src/saltosGringa/SaltosGringa07.jpeg', 22, 5),
(1006, 'Salto Tábua 01', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua01.jpeg', 20, 21),
(1007, 'Salto Tábua 02', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua02.jpeg', 20, 16),
(1008, 'Salto Tábua 03', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua03.jpeg', 20, 10),
(1009, 'Salto Tábua 04', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua04.jpeg', 20, 23),
(1010, 'Salto Tábua 05', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua05.jpeg', 20, 7),
(1011, 'Salto Tábua 06', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua06.jpeg', 20, 26),
(1012, 'Salto Tábua 07', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua07.jpeg', 20, 13),
(1013, 'Salto Tábua 08', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua08.jpeg', 20, 29),
(1014, 'Salto Tábua 09', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua09.jpeg', 20, 18),
(1015, 'Salto Tábua 10', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua10.jpeg', 20, 5),
(1016, 'Salto Tábua 11', 155.00, 'Sandália com salto grosso retangular, proporcionando mais estabilidade.', '../html/src/saltosTabua/SaltosTabua11.jpeg', 20, 24),
(1017, 'Salto Taça 01', 140.00, 'Salto diferenciado no formato de taça, moderno e elegante.', '../html/src/saltosTaca/SaltosTaca01.jpeg', 19, 17),
(1018, 'Salto Taça 02', 140.00, 'Salto diferenciado no formato de taça, moderno e elegante.', '../html/src/saltosTaca/SaltosTaca02.jpeg', 19, 11),
(1019, 'Salto Taça 03', 140.00, 'Salto diferenciado no formato de taça, moderno e elegante.', '../html/src/saltosTaca/SaltosTaca03.jpeg', 19, 28),
(1020, 'Salto Taça 04', 140.00, 'Salto diferenciado no formato de taça, moderno e elegante.', '../html/src/saltosTaca/SaltosTaca04.jpeg', 19, 14),
(1021, 'Salto Taça 05', 140.00, 'Salto diferenciado no formato de taça, moderno e elegante.', '../html/src/saltosTaca/SaltosTaca05.jpeg', 19, 20),
(1022, 'Salto Taça 06', 140.00, 'Salto diferenciado no formato de taça, moderno e elegante.', '../html/src/saltosTaca/SaltosTaca06.jpeg', 19, 8),
(1023, 'Salto Taça 07', 140.00, 'Salto diferenciado no formato de taça, moderno e elegante.', '../html/src/saltosTaca/SaltosTaca07.jpeg', 19, 25),
(1024, 'Salto Taça 08', 140.00, 'Salto diferenciado no formato de taça, moderno e elegante.', '../html/src/saltosTaca/SaltosTaca08.jpeg', 19, 6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nome_usuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nome_usuario`, `email`, `senha`, `token`) VALUES
(1, 'João Silva', 'joao@email.com', '$2y$10$examplehashhere', NULL),
(2, 'Tester User', 'tester@exemplo.com', '$2y$10$jkk/2qr.lgc9EeZ9TK93RuUVcCeLnttHtWOEfAgKHbTdHSOGC9rWW', '5295425f631317ceeb925d6dc3e4b6ffde00840ce9d7d36408ade05a6b43a126'),
(3, 'teste3', 'teste3@email.com', '$2y$10$aXJDM2lMkTxPacj0df4dLOb8STq2NTJaIUpuns/BXqM//3Uu5cLNS', '733358969dcea5840c371e503409d8cd8cbdc7c36dd6421c04786579dafc3e0e'),
(4, 'Carlos', 'carlos@email.com', '$2y$10$HdyqzmIshVFEdSqUcxNFsOqlCuY8yLyuUTa4Wn9ozPDTOn47hr3mO', 'c424e8aba19a887b1bec77cfeede3c4bc57a89933d9accf513dca518d79f8ac4');

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas`
--

CREATE TABLE `vendas` (
  `id_venda` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `data_pedido` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vendas`
--

INSERT INTO `vendas` (`id_venda`, `usuario_id`, `total`, `data_pedido`) VALUES
(1, 2, 30.00, '2025-11-20 01:35:41'),
(2, 2, 280.00, '2025-11-24 14:37:49');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `carrinho`
--
ALTER TABLE `carrinho`
  ADD PRIMARY KEY (`id_carrinho`),
  ADD UNIQUE KEY `unique_cart_item` (`usuario_id`,`id_produto`),
  ADD KEY `id_produto` (`id_produto`);

--
-- Índices de tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nome_categoria` (`nome_categoria`);

--
-- Índices de tabela `itens_pedido`
--
ALTER TABLE `itens_pedido`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `id_venda` (`id_venda`),
  ADD KEY `id_produto` (`id_produto`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Índices de tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id_venda`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `carrinho`
--
ALTER TABLE `carrinho`
  MODIFY `id_carrinho` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `itens_pedido`
--
ALTER TABLE `itens_pedido`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1025;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id_venda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `carrinho`
--
ALTER TABLE `carrinho`
  ADD CONSTRAINT `carrinho_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `carrinho_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`) ON DELETE CASCADE;

--
-- Restrições para tabelas `itens_pedido`
--
ALTER TABLE `itens_pedido`
  ADD CONSTRAINT `itens_pedido_ibfk_1` FOREIGN KEY (`id_venda`) REFERENCES `vendas` (`id_venda`) ON DELETE CASCADE,
  ADD CONSTRAINT `itens_pedido_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`) ON DELETE CASCADE;

--
-- Restrições para tabelas `produtos`
--
ALTER TABLE `produtos`
  ADD CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id_categoria`) ON DELETE SET NULL;

--
-- Restrições para tabelas `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
