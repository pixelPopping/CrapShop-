1 Verantwoordings document

bij het schrijven van de code kwam ik er achter dat ik meerdere context nodig had om paginas dieper te laten zien wie er is ingelogd;
Maar ook het bijhouden van een Cart favorieten en een spin context

1 Waarom heb ik de keuze gemaakt voor een cart context, bij het fetchen van de producten in de shop, en een shop/detailpagina hebben gemaakt, ben ik begonnen met een setup van een simpele shopping cart component, om
producten aan de cart toe te voegen; Stap voor stap ben ik het component gaan uitbreiden. In eerste instantie was
de cart alleen bruikbare op de detailpagina met simpel alleen een add to cart button. Toen dit allemaal werkend was is, ben ik begonnen met de context om het
winkelmandje te abonneren op paginas dieper. Ik heb de context veder uitgebreid, door eerst het op te slaan in de storage,
maar ook het ophalen van de cart per gebruiker door de cart te abonneren op de Authcontext. Hierna is er ook een cart pagina bijgekomen met counter 
buttons met functies vanuit de context. De cart is ook geaboneert op de favorietenContext en ShoppingCartContext 

2 Omdat een van mij functionaliteiten in de idee fase een favorieten pagina was. Heb ik een favorieten context gemaakt,
die afleidt van de cart context. Wat een slimme keuze is omdat de werking hetzelfde is alleen bij de cart is er de checkout button. Ok met de favorieten 
pagina waar de favorieten verschijnen die is dan geabonneerd op de ShoppingCartContext en Authcontext. Ik wilde dit dus ook per gebruiker gaan opslaan in de storage en ophalen bij het inloggen, 
nu werkte dit goed bij de cart maar niet met de favorieten, ik heb toen de code vergelijkt. En de FavorietenContext en pagina indentiek hetzelfde gemaakt als de cart,
geen succes. Eerst dacht ik dat ik in beide codes de item properties aansprak, ik heb dit opgelost door in het component in de hook { item: FavoriteContext en item: ShoppingCartContext } te implementeren. 
uiteindelijk heb ik het toch werkend gekregen met 2 useEffects met een async await functie savedFavorites en loadFavorites met API en GET PUT request naar de novi backend. Hiervoor moest ik wel een nieuwe
collectie maken en velden toevoegen. dit werkt nog niet 100% maar door in iedergeval alvast de collecties en velden te maken kan dit doorontwikeld worden. ook de favorieten pagina is geaboneerd op de ShoppingCartContext en authContext

3 Na de documentatie ben ik gaan denken welke kernfunctionaliteit gaat mij het meeste werk kosten, aan de hand van een lijs met prioriteiten
ben ik begonnen met de Wheel of Fortune. Aan de hand van een stappen plan ben ik te werk gegaan, dit is begonnen met een unorder list met de items van het rad.
Met een spin button die nog niet werkte. Ik heb al een lijst we weten wat de items zijn. Ik heb toen een wheelspin functie gemaakt in de functie heb ik een constant met een variabele asign aan een array met de items. Hierbij gebruik ik math.random en math.floor methode
om een willekeurig item te kiezen. Om resultaten te laten zien heb ik een useState hook gemaakt om de resultaten in op te slaan. De button heb ik ineractief gemaakt door wheelspin door te geven als data. Nu ik de basis heb, ben ik dit gaan uitbreiden door ook een hook te maken om de spins the controleren.
De volgende stap was om al een begin te maken aan de visualisatie van het wheel. Dit is begonnen met een simpele cirkel die ik draaiend heb gemaakt doormiddel van een transition en settimeout, deze werkt door op de spin button te klikken ook werden de resultaten weergeven.
Het maken van de segmenten van het wheel was een uitdaging. Ik heb hiervoor een tutorial gekeken op youtube, en die styling gebruikt en het mij eigen stijl gegeven. Nu het wiel draaide en stopte met het resultaat, de volgende stap was om de spins te controleren met een hook. Nu was het nog geen echt rad wat stopt op het item,
door dit werkend te krijgen heb ik wel chat gtp gebruikt op een manier, de code uit te leggen zonder code alleen stappen en gerichte vragen. Ik heb dus een berekening moeten maken om het wheel te laten stoppen op de uitkomst hoek. Nu dit werkte, heb ik de rotatie ook opgeslagen in een hook. Nu heb ik een wheel die uit 2 helften bestaat box 1 en box 2
waardoor de uitkomst van de stophoek niet klopte. Door dit op te lossen heb ik 1 box gemaakt waar alle items in staan, ik heb toen een pointer voor uitkomst gemaakt, maar dat werkte niet lekker. Uiteindelijk heb ik bij de uikomst de tekst laten hoveren. de spin button word na 3 spins disabled 

Nu had ik 1 component voor alle code maar dat component werd veelste zwaar, ik ben mij code gaan opsplitsen. Een aparte component voor wheel-of-fortune, en een spinContext waar alle logica instaat, waardoor het component het alleen uitvoert
daar ben ik ook begonnen met het maken van helper functies Oa voor de items radomItem en voor de angle, mij keuze daarvoor is dit zijn kleine functies die specifiek 1 ding uitvoeren. Ook is de code hierdoor beter te onderhouden.

Nu alles werkt, moet je natuurlijk ook uitkomen op de pagina hievoor ben ik begonnen met een switch statement met useNavigate wat werkte. 
alleen doordat sommige categorieen geen hele zinnen waren en met leestekens, moest dit op een andere manier gebeuren. 


4 Door de code nog meer op te splitsen heb ik ervoor gekozen om een handlespin context te maken. in de context sla ik 
de spins per gebruiker op in de localstorage, doormiddel van data presisten word er bij het inloggen gekeken of de gebruiker nog spins heeft, die worden dan opgehaald.
voor die sideEffect daar zorgt de useEffect voor. door de context te gebruiken is het bijv ook mogelijk de spin count door tegeven aan andere paginas. Doordat de code in een context zit
is dit beter te onderhouden.


5


 