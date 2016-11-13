define(['exports', '../content/content'],
    function (exports, content) {
        'use strict';

        var ContentPart = content.ContentPart;

        exports.listItems = {
            'news': {
                'sk': [
                    {
                        title: 'OCENENIA',
                        content: [
                            ContentPart.forText('10/2016 - Kaplnka vzkriesenia nominovaná na prestížnu Cenu Dušana Jurkoviča 2016'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('09/2016 - Kaplnka vzkriesenia nominovaná na medzinárodnu cenu Piranesi 2016'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('09/2016 – Kaplnka získala Cenu časopisu Moderní obec v rámci súťaže Young Architect Awardc')
                        ]
                    },
                    {
                        title: 'PREDNÁŠKY',
                        content: [
                            ContentPart.forText('06/2016 Bratislava\nPrednáška a diskusia o sakrálnom priestore v rámci Dlhej noci kostolov'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('03/2012 Bratislava\nPrezentujem svoju diplomku o Petržalke na Pecha Kucha Night 18'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('12/2010 Brno\nPrednáška o Akadémii vo Viedni v rámci cyklu Format 400')
                        ]
                    },
                    {
                        title: 'MÉDIA',
                        content: [
                            ContentPart.forText('11/2016 Časopis ASB\nČlánok o kaplnke'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('10/2016 Časopis ARCH\nVeľký rozhovor a článok o kaplnke.'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('07/2016 Drevársky magazin\nČlánok o kaplnke'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('06/2016 Ročenka architektúry 2014/15\nKaplnka sa dostala do výberu 19 najlepších stavieb za posledné dva roky.'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('01/2015 Časopis Tatry\nTatry lákali turistov krásnymi hotelmi\nProfilový rozhovor'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('04/2012 etrend.sk\nKaplnka otvára sériu článkov o kreatívnych ľuďoch na Slovensku'),
                            ContentPart.forLinkExternal('http://podnikanie.etrend.sk/kreativne/ako-na-betonove-aleluja.html', 'http://podnikanie.etrend.sk/kreativne/ako-na-betonove-aleluja.html'),
                            ContentPart.forLineBreak(),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('05/2011 www.urbanismusbrno.cz\nO projekte Splnený sen napísal web urbanismusbrno.cz')
                        ]
                    },
                    {
                        title: 'VÝSTAVY',
                        content: [
                            ContentPart.forText('10/2011 Viedeň\nProjekt Neutralita všemohúca je  súčasťou výstavy  Big Bad Modern II'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('07/2011 Bratislava\nBetónová kaplnka v centre výstavy ARCHITECTURE.SK.05/10 – III. úroda'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('06/2011 Viedeň\nProjekt Neutralita všemohúca je ukázaný na kolektívnej výstave Akadémie s názvom Big Bad Modern I'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('05/2011 Brno\nNáš projekt Splnený sen nájdete na výstave Mestských zásahov v Brne'),
                            ContentPart.forLineBreak(),
                            ContentPart.forText('12/2008 Brno\nVýstava fotografií The London Diary')
                        ]
                    }
                ]
            }
        };
    });
