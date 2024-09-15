--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-09-16 00:03:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3497 (class 0 OID 16535)
-- Dependencies: 230
-- Data for Name: bank; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bank (id, name, treasury, "locationId", special, "deletedAt") FROM stdin;
1	RusBank	123134213	1	\N	\N
2	Sberbank	88582111	2	\N	\N
3	EngBank	123124213	3	SWIFT	\N
4	Golden	1241235	4	SWIFT	\N
5	Silver	236547568	5	SWIFT	\N
6	CopperBank	124234234	6	SWIFT	\N
7	abc	1234	1	\N	2024-09-15 16:22:19.191157
\.


--
-- TOC entry 3498 (class 0 OID 16601)
-- Dependencies: 231
-- Data for Name: bank_currencies_currency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bank_currencies_currency ("bankId", "currencyId") FROM stdin;
1	4
2	4
3	5
3	6
4	5
4	6
5	5
5	6
6	5
6	6
7	4
7	5
7	6
\.


--
-- TOC entry 3487 (class 0 OID 16484)
-- Dependencies: 220
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.city (id, name, "regionId", "deletedAt") FROM stdin;
1	Moscow	1	\N
2	Saint-Petersburg	2	\N
3	Los-Angeles	3	\N
4	Washington	4	\N
5	Prague	5	\N
7	city2	1	2024-09-15 16:22:28.280085
6	abc	3	\N
\.


--
-- TOC entry 3495 (class 0 OID 16524)
-- Dependencies: 228
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country (id, alpha2, alpha3, "languageId", name, "deletedAt") FROM stdin;
2	US	USA	2	United States of America	\N
3	CZ	CZE	3	Czech	\N
1	RU	RUS	1	Russia	\N
4	GU	GER	2	German	2024-09-15 12:19:05.205587
5	df	sdf	3	gerb	2024-09-15 12:29:18.100569
\.


--
-- TOC entry 3493 (class 0 OID 16513)
-- Dependencies: 226
-- Data for Name: currency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.currency (id, code, name, "deletedAt") FROM stdin;
4	RUB	Ruble	\N
5	USD	Dollar	\N
6	CZK	Czech Koruna	\N
7	ab	abc	2024-09-15 16:23:15.977537
\.


--
-- TOC entry 3491 (class 0 OID 16502)
-- Dependencies: 224
-- Data for Name: language; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.language (id, name, "deletedAt") FROM stdin;
1	Russian	\N
2	English	\N
3	Czech	\N
4	abc	2024-09-15 16:24:55.204793
\.


--
-- TOC entry 3483 (class 0 OID 16443)
-- Dependencies: 216
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1726242539673	CreateDB1726242539673
2	1726247655594	Example1726247655594
3	1726296611227	CreateDB1726296611227
4	1726298271612	CreateDB21726298271612
5	1726300199702	CreateDB31726300199702
6	1726301685707	CreateDB41726301685707
7	1726301836988	CreateDB51726301836988
8	1726302343560	CreateDB61726302343560
9	1726302458027	CreateDB71726302458027
10	1726402585652	CreateDB81726402585652
11	1726402668341	CreateDB81726402668341
\.


--
-- TOC entry 3489 (class 0 OID 16493)
-- Dependencies: 222
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.region (id, name, "countryId", "deletedAt") FROM stdin;
1	Central district	1	\N
2	North-Western District	1	\N
3	California	2	\N
4	Washington	2	\N
5	Central region	3	\N
6	South region	3	\N
7	abc	1	2024-09-15 16:24:45.612392
\.


--
-- TOC entry 3485 (class 0 OID 16473)
-- Dependencies: 218
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, password, login, email) FROM stdin;
\.


--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 229
-- Name: bank_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_id_seq', 7, true);


--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 219
-- Name: city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.city_id_seq', 7, true);


--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 227
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_id_seq', 5, true);


--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 225
-- Name: currency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.currency_id_seq', 7, true);


--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 223
-- Name: language_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.language_id_seq', 4, true);


--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 215
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 11, true);


--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 221
-- Name: region_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.region_id_seq', 7, true);


--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


-- Completed on 2024-09-16 00:03:48

--
-- PostgreSQL database dump complete
--

