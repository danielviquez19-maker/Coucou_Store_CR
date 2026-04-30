const PRODUCTS = [
  {id:'VF17605', brand:'Nicole Lee', collection:'Virtual Friend', category:'Bolsos', name:'Bolso Cuadrado', price:34000, priceLabel:'₡34 000', measures:'34 cm x 24,5 cm x 14 cm', page:2, image:'assets/img/products/p2-000.jpg'},
  {id:'VF17606', brand:'Nicole Lee', collection:'Virtual Friend', category:'Bolsos', name:'Bolso de mano', price:33000, priceLabel:'₡33 000', measures:'32 cm x 24 cm x 10,5 cm', page:2, image:'assets/img/products/p2-003.jpg'},
  {id:'VF17607', brand:'Nicole Lee', collection:'Virtual Friend', category:'Bolsos', name:'Bolso de mano', price:32000, priceLabel:'₡32 000', measures:'33 cm x 22 cm x 9 cm', page:2, image:'assets/img/products/p2-012.jpg'},
  {id:'VF17608', brand:'Nicole Lee', collection:'Virtual Friend', category:'Manos libres', name:'Manos libres', price:33000, priceLabel:'₡33 000', measures:'28 cm x 23,5 cm x 12 cm', page:2, image:'assets/img/products/p2-004.jpg'},
  {id:'VF17609', brand:'Nicole Lee', collection:'Virtual Friend', category:'Manos libres', name:'Manos libres', price:31000, priceLabel:'₡31 000', measures:'24 cm x 19 cm x 9 cm', page:2, image:'assets/img/products/p2-005.jpg'},
  {id:'VF17610', brand:'Nicole Lee', collection:'Virtual Friend', category:'Bolsos', name:'Bolso Cuadrado', price:32000, priceLabel:'₡32 000', measures:'27 cm x 21 cm x 13 cm', page:2, image:'assets/img/products/p2-015.jpg'},

  {id:'VF17612', brand:'Nicole Lee', collection:'Virtual Friend', category:'Bolsos', name:'Bolso de hombro', price:33000, priceLabel:'₡33 000', measures:'30 cm x 20 cm x 13 cm', page:3, image:'assets/img/products/p3-000.jpg'},
  {id:'PRT17613', brand:'Nicole Lee', collection:'Virtual Friend', category:'Bolsos', name:'Bolso para almuerzo', price:36000, priceLabel:'₡36 000', measures:'40,5 cm x 30 cm x 17,5 cm', page:3, image:'assets/img/products/p3-003.jpg'},
  {id:'VF17661', brand:'Nicole Lee', collection:'Virtual Friend', category:'Bolsos', name:'Bolso Multifuncional', price:32000, priceLabel:'₡32 000', measures:'23 cm x 23,5 cm x 11 cm', page:3, image:'assets/img/products/p3-006.jpg'},
  {id:'PRT17485', brand:'Nicole Lee', collection:'Virtual Friend', category:'Manos libres', name:'Manos libres', price:18000, priceLabel:'₡18 000', measures:'12 cm x 18 cm x 6 cm', page:3, image:'assets/img/products/p3-010.jpg'},
  {id:'GFT17675', brand:'Nicole Lee', collection:'Virtual Friend', category:'Sets', name:'Set 2 piezas', price:20000, priceLabel:'₡20 000', measures:'21 cm x 15 cm x 7 cm | Monedero: 7 cm x 10,5 cm x 2 cm', page:3, image:'assets/img/products/p3-012.jpg'},

  {id:'LG1418', brand:'Nicole Lee', collection:'Virtual Friend', category:'Maletas', name:'Maleta', price:52000, priceLabel:'₡52 000', measures:'32 cm x 45 cm x 18 cm', page:4, image:'assets/img/products/p4-000.jpg'},
  {id:'BP17604', brand:'Nicole Lee', collection:'Virtual Friend', category:'Mochilas', name:'Mochila', price:37000, priceLabel:'₡37 000', measures:'32,5 cm x 47 cm x 19 cm', page:4, image:'assets/img/products/p4-006.jpg'},
  {id:'PRT8018', brand:'Nicole Lee', collection:'Virtual Friend', category:'Billeteras', name:'Billetera', price:15000, priceLabel:'₡15 000', measures:'9 cm x 18 cm x 2,2 cm', page:4, image:'assets/img/products/p4-012.jpg'},
  {id:'PRT8019', brand:'Nicole Lee', collection:'Virtual Friend', category:'Billeteras', name:'Mini Billetera', price:15000, priceLabel:'₡15 000', measures:'9,5 cm x 14 cm x 3,5 cm', page:4, image:'assets/img/products/p4-003.jpg'},
  {id:'PRT8040', brand:'Nicole Lee', collection:'Virtual Friend', category:'Manos libres', name:'Mini manos libres', price:8000, priceLabel:'₡8 000', measures:'9,5 cm x 10 cm x 1,5 cm', page:4, image:'assets/img/products/p4-009.jpg'},
  {id:'BC7605', brand:'Nicole Lee', collection:'Virtual Friend', category:'Accesorios', name:'Manta multifuncional', price:15000, priceLabel:'₡15 000', measures:'40 cm x 40 cm', page:4, image:'assets/img/products/p4-015.jpg'},

  {id:'NT8000', brand:'Nicole Lee', collection:'Virtual Friend', category:'Papelería', name:'Agenda', price:5000, priceLabel:'₡5 000', measures:'11,5 cm x 18,5 cm x 2,5 cm', page:5, image:'assets/img/products/p5-000.jpg'},
  {id:'NT8001', brand:'Nicole Lee', collection:'Virtual Friend', category:'Papelería', name:'Agenda', price:6000, priceLabel:'₡6 000', measures:'17 cm x 21 cm x 2 cm', page:5, image:'assets/img/products/p5-004.jpg'},
  {id:'SET17602', brand:'Nicole Lee', collection:'Virtual Friend', category:'Sets', name:'Set 5 piezas - Mochila', price:45000, priceLabel:'₡45 000', measures:'Mochila, manos libres, cosmetiquera, monedero y billetera', page:5, image:'assets/img/products/p5-008.jpg'},
  {id:'SET17603', brand:'Nicole Lee', collection:'Virtual Friend', category:'Sets', name:'Set 5 piezas - Bolso', price:45000, priceLabel:'₡45 000', measures:'Bolso, manos libres, cosmetiquera, monedero y billetera', page:5, image:'assets/img/products/p5-014.jpg'},


  {id:'PRT17486', brand:'Nicole Lee', collection:'Virtual Friend', category:'Manos libres', name:'Manos libres', price:20000, priceLabel:'₡20 000', measures:'16,5 cm x 21,5 cm x 8 cm', page:6, image:'assets/img/products/p6-000.jpg'},
  {id:'COS7980', brand:'Nicole Lee', collection:'Virtual Friend', category:'Cosmetiqueras', name:'Cosmetiquera', price:12000, priceLabel:'₡12 000', measures:'22,5 cm x 16,5 cm x 11 cm', page:6, image:'assets/img/products/p6-006.jpg'},
  {id:'COS7970', brand:'Nicole Lee', collection:'Virtual Friend', category:'Cosmetiqueras', name:'Cosmetiquera', price:21000, priceLabel:'₡21 000', measures:'28 cm x 23 cm x 12 cm', page:6, image:'assets/img/products/p6-003.jpg'},
  {id:'COS7971', brand:'Nicole Lee', collection:'Virtual Friend', category:'Cosmetiqueras', name:'Cosmetiquera', price:21000, priceLabel:'₡21 000', measures:'27 cm x 16 cm x 18 cm', page:6, image:'assets/img/products/p6-012.jpg'},
  {id:'PRT8042', brand:'Nicole Lee', collection:'Virtual Friend', category:'Tarjeteros', name:'Tarjetero', price:9000, priceLabel:'₡9 000', measures:'11,5 cm x 9,5 cm x 2 cm', page:6, image:'assets/img/products/p6-010.jpg'},
  {id:'JW7827', brand:'Nicole Lee', collection:'Virtual Friend', category:'Joyería / Joyeros', name:'Joyero', price:38000, priceLabel:'₡38 000', measures:'28 cm x 18 cm x 17 cm', page:6, image:'assets/img/products/p6-015.jpg'},

  {id:'P17518', brand:'Nicole Lee', collection:'Chick Check', category:'Bolsos', name:'Bolso de mano', price:27000, priceLabel:'₡27 000', measures:'31 cm x 19 cm x 10 cm', page:7, image:''},
  {id:'P17519', brand:'Nicole Lee', collection:'Chick Check', category:'Bolsos', name:'Bolso de mano', price:27000, priceLabel:'₡27 000', measures:'30 cm x 18 cm x 13 cm', page:7, image:''},
  {id:'P17521', brand:'Nicole Lee', collection:'Chick Check', category:'Bolsos', name:'Bolso de mano', price:29000, priceLabel:'₡29 000', measures:'36 cm x 30 cm x 12 cm', page:8, image:''},
  {id:'BES17414', brand:'Nicole Lee', collection:'Best Smile', category:'Bolsos', name:'Bolso de mano', price:29000, priceLabel:'₡29 000', measures:'32 cm x 21,5 cm x 12,5 cm', page:9, image:''},
  {id:'BES17416', brand:'Nicole Lee', collection:'Best Smile', category:'Mochilas', name:'Mochila', price:34000, priceLabel:'₡34 000', measures:'29 cm x 39 cm x 17 cm', page:9, image:''},
  {id:'MOD17421', brand:'Nicole Lee', collection:'Moda Snowflake', category:'Bolsos', name:'Bolso de hombro', price:33000, priceLabel:'₡33 000', measures:'48 cm x 29 cm x 19 cm', page:12, image:''},
  {id:'SLB17210', brand:'Nicole Lee', collection:'Samantha La Belleza', category:'Manos libres', name:'Manos libres', price:30000, priceLabel:'₡30 000', measures:'21 cm x 20 cm x 10 cm', page:15, image:''},
  {id:'JS17029', brand:'Nicole Lee', collection:'Sofia Montana', category:'Mochilas', name:'Mochila', price:33000, priceLabel:'₡33 000', measures:'25 cm x 35 cm x 12 cm', page:16, image:''},
  {id:'FLO17474', brand:'Nicole Lee', collection:'Flor Pop', category:'Bolsos', name:'Bolso de mano', price:31000, priceLabel:'₡31 000', measures:'28,5 cm x 23 cm x 14 cm', page:17, image:''},
  {id:'FLO17475', brand:'Nicole Lee', collection:'Flor Pop', category:'Mochilas', name:'Mochila', price:34000, priceLabel:'₡34 000', measures:'25,5 cm x 32 cm x 13 cm', page:17, image:''},
  {id:'DCT17256', brand:'Nicole Lee', collection:'Dream Comes True', category:'Bolsos', name:'Bolso de mano', price:31000, priceLabel:'₡31 000', measures:'32 cm x 20 cm x 13 cm', page:19, image:''},
  {id:'SET17295', brand:'Nicole Lee', collection:'Dream Comes True', category:'Sets', name:'Set 3 piezas', price:43000, priceLabel:'₡43 000', measures:'Bolso, manos libres y billetera', page:19, image:''},

  {id:'NK13137', brand:'Nikky', collection:'Sweet Girl', category:'Mochilas', name:'Mochila', price:25000, priceLabel:'₡25 000', measures:'29,5 cm x 39,5 cm x 12 cm', page:173, image:''},
  {id:'NK13118', brand:'Nikky', collection:'Sweet Girl', category:'Manos libres', name:'Manos libres', price:17000, priceLabel:'₡17 000', measures:'22,5 cm x 16,5 cm x 6,5 cm', page:173, image:''},
  {id:'NK13170', brand:'Nikky', collection:'Sweet Girl', category:'Sets', name:'Set 3 piezas', price:28000, priceLabel:'₡28 000', measures:'18 cm x 22 cm x 7,5 cm | Manos libres: 17 cm x 9 cm x 9 cm', page:174, image:''},
  {id:'NK25045', brand:'Nikky', collection:'Sweet Girl', category:'Botellas y vasos', name:'Vaso térmico', price:15000, priceLabel:'₡15 000', measures:'1200 ml | 12 horas frío', page:174, image:''},
  {id:'NK20342', brand:'Nikky', collection:'Sweet Girl', category:'Monederos', name:'Monedero', price:3500, priceLabel:'₡3 500', measures:'8 cm x 7 cm x 3 cm', page:175, image:''}
];
