import { Alert, Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useGlobalStore } from "../../../../globalStore/globalStore";
import { INote } from "../../../../interfaces/INote";
import styles from "./note.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Note = (): JSX.Element | null => {
  const globalStore = useGlobalStore();

  const [note, setNote] = useState<INote | null>(null);

  useEffect(() => {
    setNote(globalStore.selectedNote);
  }, [globalStore.selectedNote]);

  if (!note) {
    return (
      <Alert icon={<AiOutlineInfoCircle />} title="No Note selected">
        Select a note within a folder on the left hand side menu.
      </Alert>
    );
  }

  return (
    <div>
      <p>Note ID: {note.id}</p>
      <p>{note.note}</p>
      <br></br>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id non amet
        dolor tempora repellendus delectus architecto laboriosam qui et numquam
        molestiae excepturi maxime nobis provident, sit laborum porro! Dolore,
        impedit! Nulla odit hic omnis quaerat eaque incidunt! Enim atque
        assumenda odio laboriosam nobis nemo corporis, pariatur quia, eaque,
        similique itaque ipsa aperiam aspernatur praesentium quidem maiores
        laudantium veritatis. Adipisci, iure! Ratione eveniet atque quia laborum
        animi in ut nihil est, consequuntur pariatur illum ex itaque id,
        delectus enim odit. Nobis at alias corrupti sit quo mollitia,
        exercitationem ratione commodi nam. Earum porro dolor, nulla aliquid
        deserunt pariatur quas laudantium eveniet rerum provident dolores error
        quibusdam odio sit quis et ipsa nostrum odit qui! Dolorum harum, qui
        vero ipsam voluptatum magnam? Voluptatibus, possimus cumque unde sunt
        veritatis earum enim quasi ipsam, aliquid mollitia ea a commodi dolore.
        Eum facere odit nesciunt assumenda ullam nostrum eveniet hic quis
        facilis necessitatibus, error placeat? Aliquid eius laudantium qui
        incidunt asperiores aperiam soluta, maxime ipsum sint accusamus
        cupiditate iure! Nostrum, illo deserunt porro iste quae labore quod
        exercitationem consequuntur. Officiis unde recusandae harum consequuntur
        ut. Saepe fuga, doloribus aut expedita voluptatibus totam, quae sed
        fugiat perferendis eligendi omnis dolores ducimus incidunt officiis sint
        non officia quia! Maiores, perferendis quos deserunt ducimus id
        accusamus provident praesentium. Nam cupiditate corporis exercitationem
        quam quisquam amet minima tenetur accusamus aspernatur ad ducimus saepe,
        fugiat consequatur laudantium mollitia harum eius dolore aperiam aliquam
        veniam? Magnam alias placeat vero quos iure. Dicta cupiditate minus
        molestiae eligendi fugiat sit eum recusandae commodi odio consectetur?
        Minima iusto assumenda laudantium odio incidunt hic voluptatibus a
        consequuntur quisquam, excepturi voluptates nisi labore, animi dolores
        similique. Deleniti magnam beatae ipsum eaque voluptates, voluptatem
        delectus at impedit nisi accusamus quisquam consequuntur sapiente.
        Nostrum accusamus placeat, molestiae ab soluta quisquam? Culpa libero,
        eveniet molestiae iusto aut corporis odit? Deserunt voluptatibus
        consequuntur, et facere optio a accusamus minus provident maiores
        molestias ullam, odio architecto quod pariatur esse fugiat
        necessitatibus fuga, temporibus aliquam similique cumque dignissimos
        sapiente velit! Quidem, cum. Debitis quaerat blanditiis provident,
        dolorum adipisci enim repellat nulla placeat, aspernatur alias
        praesentium tempore. Repellat dolore perferendis explicabo numquam ipsa
        reprehenderit quibusdam iure alias aut autem? Hic ab exercitationem
        illo. Porro laboriosam illo sit corporis! Ut esse et odit culpa ea iste
        molestiae. Ullam, aperiam expedita est nihil nostrum atque aliquid
        blanditiis architecto placeat illo. Quisquam, aperiam. Fugiat,
        consequatur nemo. Delectus ullam dolores ducimus sed vero similique
        reprehenderit ut dolor fugit ea animi molestias nulla impedit tenetur
        magnam eos ratione sit adipisci, provident id, quibusdam molestiae! A
        culpa vel nesciunt. Porro quas blanditiis eligendi illum eius assumenda
        necessitatibus, quia sapiente suscipit, explicabo animi? Pariatur
        maiores ratione laudantium et provident, aperiam voluptate fugiat
        repellendus dolorem omnis deleniti id harum odio nobis? Suscipit
        repudiandae fugit dolor quae debitis explicabo ab nobis, optio corrupti
        quaerat tempora veniam dolorem est, voluptatem eveniet beatae tenetur.
        Temporibus tenetur repellat rem incidunt quidem atque eveniet magni
        maxime? Molestiae non cum incidunt, soluta molestias corporis minima,
        commodi unde explicabo quos numquam repellat impedit aliquam rem. At aut
        fuga, explicabo, fugit, dolor praesentium minus optio soluta inventore
        illum nihil. Enim debitis optio aut deleniti adipisci veniam
        consequuntur vitae delectus aliquid eligendi maiores, a nulla, error
        fugit placeat neque? Ut, temporibus delectus repudiandae asperiores
        placeat suscipit ipsa expedita veniam velit? Esse consequatur numquam
        exercitationem facilis beatae cupiditate iure iusto, quam assumenda
        eaque qui delectus ratione repellat repellendus. Nostrum minima
        asperiores in facere, ipsum, optio adipisci iusto dolorem sunt quo
        maxime? Sapiente mollitia consequuntur sint quos doloribus temporibus
        animi ex, amet ducimus deserunt nam quo odio eligendi, obcaecati error
        repellat vero assumenda, fuga illum quam voluptatibus ut. Corporis
        sapiente culpa blanditiis! Nisi, provident? Libero alias aut mollitia
        est minus quidem reprehenderit a optio quam nemo quas vero, blanditiis
        delectus nesciunt nihil accusamus! Mollitia nostrum iure delectus iusto
        dicta quis veritatis nisi. Fugiat assumenda earum sapiente, vero enim
        quae neque, ea nesciunt suscipit molestias vel illum omnis dolores quas
        harum fugit tempora similique? Ipsam quia placeat numquam vitae est vero
        earum perferendis! Beatae, totam sequi? Corrupti nemo delectus
        laudantium doloremque perspiciatis, laboriosam ad ducimus sed ratione
        officiis reiciendis soluta id eos! Ea voluptatem laborum distinctio et.
        Doloribus voluptatum nam voluptatibus officia perspiciatis. Officia
        veniam debitis earum in vero? Repellat sequi voluptatem illo, nostrum
        nisi aliquam quas eum distinctio praesentium aut vitae itaque dolore
        cupiditate vero debitis ipsam iure qui, odio unde obcaecati. Corrupti,
        quos quas sed exercitationem, illum non molestiae id aperiam voluptates
        perferendis laboriosam. Natus vel nobis ratione rerum illum quos sint
        sequi minima libero nisi, velit exercitationem aliquid, saepe ex.
        Incidunt assumenda accusantium dolore sit nemo asperiores minima, ex
        temporibus excepturi reprehenderit fugit consequatur eos facilis
        necessitatibus tenetur vel cupiditate architecto ipsam accusamus quod
        qui et quas, nihil veniam! Consectetur. Quis in libero repellat deleniti
        reprehenderit vel, reiciendis numquam, aliquam rerum nulla
        necessitatibus saepe iure excepturi nobis animi accusantium qui minus
        aliquid fuga minima? Quasi voluptates nostrum omnis quia quisquam. Autem
        totam voluptatum pariatur quasi nostrum aliquam! Voluptatibus nisi
        dolorem, officia architecto velit maiores expedita, aliquid, odio
        distinctio deleniti quas molestias. Sit necessitatibus ut quod
        repudiandae sapiente quam, quos ducimus? Pariatur itaque exercitationem
        aperiam dolores! Facilis animi consequuntur sint et porro explicabo
        magnam officiis, fugit, hic cumque sapiente aliquam modi soluta atque
        dolores, saepe ullam repellat quaerat! Vitae, ab perspiciatis? Suscipit
        sunt qui exercitationem recusandae maxime quia vitae consectetur
        reprehenderit placeat iure sint illum, veritatis iusto dolore? Qui minus
        quis officia culpa alias placeat veritatis, fugiat tenetur harum beatae
        nobis! Cum obcaecati dolore expedita, facere assumenda incidunt nisi
        voluptates corporis nihil sed accusamus quo debitis, ipsam neque aliquam
        commodi fuga quae optio velit placeat deleniti fugiat? Architecto facere
        blanditiis natus? Tempore distinctio esse corrupti repellendus illo
        dignissimos quas repudiandae dicta dolorum veniam dolores blanditiis
        porro nam enim aspernatur labore cum natus, sequi temporibus tempora at
        quos iste eos quis. Recusandae. Cumque placeat tempora obcaecati iusto
        ratione ipsam animi voluptatibus, pariatur, architecto blanditiis
        mollitia. Odit sequi reiciendis facere optio dicta iure accusantium
        blanditiis, eaque perferendis, non totam, animi itaque. Magni, tempora.
        Vero possimus, iusto, unde temporibus, error harum fuga vitae eligendi
        saepe perspiciatis mollitia eveniet! Modi assumenda est obcaecati beatae
        inventore omnis et autem distinctio, corporis illum! Rem quasi
        necessitatibus mollitia. Quasi ipsa eaque et natus magni fugit aliquam
        error ex necessitatibus nostrum magnam, nobis harum repellendus
        distinctio velit architecto fuga commodi perspiciatis! Excepturi cumque
        maxime nostrum quod illum tempore eos? Perferendis rem quae ipsa velit
        quod aut a quidem ratione! Iste assumenda, quibusdam, quam perferendis
        facere eos ducimus similique nemo nobis quasi soluta libero nam sit
        cumque doloribus? Eum, vel? Sint optio quae, quis iste labore voluptas
        ab maxime blanditiis assumenda soluta provident doloribus quas incidunt
        sequi, distinctio repellendus? Illum corporis impedit optio? Ut vero
        nihil est ex incidunt voluptatibus! Maiores culpa et eligendi amet
        suscipit iusto impedit quae quia, itaque nulla reprehenderit error, eos
        hic dolor ex earum voluptatem. Ducimus, pariatur sit dolore harum eum
        exercitationem possimus tenetur animi. Expedita reprehenderit quasi
        voluptate sint hic at quibusdam adipisci harum commodi provident
        accusamus ipsum perspiciatis odio dolore, voluptates iure modi veritatis
        minus a nostrum recusandae dolores? Hic voluptas maiores odio! Nam
        cumque corrupti molestiae quaerat, veritatis voluptatum provident
        architecto fugiat debitis maiores. Sapiente quos voluptatem sequi
        debitis impedit facilis totam soluta, autem delectus minima perspiciatis
        fugit vitae porro aspernatur. Architecto. Ratione deleniti officia sequi
        ipsam! Error totam, dignissimos voluptatum vero tempore odit ipsam
        consequatur explicabo sed delectus cum ipsa. Maiores accusantium autem
        amet eos quaerat placeat possimus. Provident, ex praesentium? Tempore
        eum ut repellendus, dicta quasi quod officiis aut illo mollitia
        dignissimos molestiae aliquam velit ratione accusamus esse, rem id,
        numquam reiciendis. Officiis nobis voluptas hic eius eos quae iusto?
        Blanditiis sit voluptatum asperiores maxime illo dolores expedita natus
        sequi, labore perferendis delectus voluptatem molestiae quo ipsa quasi,
        dolore corrupti cumque laborum? Ipsam iusto accusantium aut enim
        reiciendis inventore totam. Nulla quibusdam blanditiis omnis atque
        consequatur repellat, officiis voluptate porro repellendus. Aperiam,
        dicta a. Quos fuga nam, iure ducimus quis excepturi harum, corrupti non
        doloribus, laudantium similique molestiae eligendi necessitatibus. Unde,
        possimus sed, porro ab placeat sunt velit tempora repudiandae obcaecati
        distinctio, libero ea quasi error. Sapiente amet et totam laborum
        nostrum reprehenderit quod, rem ullam nisi laboriosam impedit unde.
        Illum harum ad non adipisci temporibus quibusdam commodi vel, velit
        maiores est a totam? Consequuntur cum tenetur ipsum repudiandae
        accusantium similique dolorum tempora quas sit, doloribus ab maxime hic
        quam. Hic commodi, officiis quod odio molestiae voluptatum sunt ea nemo
        facere aperiam blanditiis illum voluptas accusantium dolore omnis
        ducimus a eos! Commodi ipsam porro maxime amet possimus officiis error
        neque! Dolorum repudiandae, illo temporibus sapiente nihil laborum amet
        illum exercitationem. Porro assumenda sequi odio suscipit! Labore,
        aspernatur. Enim quis, aut accusamus animi magnam molestias sint
        aspernatur, alias soluta iusto omnis? Dignissimos excepturi error
        laborum. Dicta deserunt fugiat ad magnam mollitia hic qui fugit!
        Consectetur ipsum commodi adipisci asperiores. Rem accusamus commodi
        deserunt eius eveniet cum, nam deleniti! Dolor, consequatur facilis?
        Quas fugit blanditiis voluptas a modi, illo illum mollitia eius
        voluptates omnis adipisci consectetur tempora doloremque distinctio
        quibusdam deserunt qui labore, odit officia totam tenetur et ducimus
        autem accusantium. Quibusdam! Accusantium iure assumenda ab ea error
        quae vero odio iusto ducimus labore, suscipit harum in quidem enim
        dignissimos id rerum? Ex itaque rem quidem, sed ipsum odit impedit
        explicabo aliquid. Quis aperiam iste, labore et cumque laborum facere
        non ea cum exercitationem unde laboriosam dolor earum a eveniet quo eum
        itaque quasi sint amet numquam quam odit commodi! Totam, asperiores?
        Ipsa perferendis reiciendis maiores velit? Veritatis maiores explicabo
        expedita quos magnam! Atque beatae maxime totam quisquam id accusamus
        ipsam facilis dolores ratione. Soluta voluptatum, corrupti vero quod
        nesciunt rerum eos? Quam obcaecati, impedit numquam eum iste voluptatum
        molestias, consequuntur molestiae veritatis a, provident eligendi nisi
        aspernatur tenetur? Ducimus minima accusamus laudantium, commodi
        possimus quasi tenetur labore ipsa culpa animi neque. Ipsa, itaque
        nesciunt? Cum commodi voluptatibus accusantium enim, facere ea
        consectetur. Iure sit, facere incidunt non odit nisi mollitia omnis
        architecto, minus animi obcaecati nam quidem recusandae cumque
        blanditiis ab. Omnis aut iusto repudiandae optio blanditiis, veniam
        corrupti iure voluptates. Velit, exercitationem iste quae reprehenderit
        sed vero adipisci expedita labore ab totam non recusandae corporis,
        explicabo vel? Consequatur, voluptate atque. Labore enim vero cumque
        aperiam corrupti, veritatis voluptatibus excepturi pariatur itaque
        molestiae. Debitis rem soluta modi architecto molestiae corrupti ipsa
        illum eius, exercitationem aut molestias et odit! Quae, veritatis porro.
        Autem, molestiae sunt architecto laudantium, cum atque nobis nihil alias
        blanditiis dolorem recusandae debitis delectus quae iste. Tempora
        soluta, quia laborum, vitae id necessitatibus ut ipsum enim harum
        corporis incidunt. Aut reiciendis eos necessitatibus quidem dicta,
        placeat sint mollitia, eaque sed, fuga nam facere quam veritatis
        delectus. Quasi tenetur repellat ab id dolorum, dolorem tempora nihil
        dignissimos ut? Eligendi, dolorem. Sed laboriosam odio deleniti officiis
        reprehenderit omnis voluptas quibusdam quasi doloribus? Cum maiores
        labore fuga tenetur? Aliquam iure maiores pariatur ducimus, esse placeat
        impedit tempore a, officia nemo possimus fugit! Ratione nisi illo nemo!
        Voluptas perspiciatis deleniti quas exercitationem quae magnam nobis
        quis esse consequatur modi ratione a debitis tempora iure, facere nemo
        quibusdam dicta mollitia fugiat maxime expedita cupiditate. Recusandae
        quibusdam cum libero quae culpa repellendus nesciunt voluptate cumque
        praesentium laudantium autem hic cupiditate at totam temporibus illum
        tempora voluptatum, excepturi quo repellat ratione nemo. Repellendus
        nobis eveniet nihil. Delectus mollitia quam dignissimos ea, id aperiam
        expedita. Iure voluptatem maxime non natus dolorum, sunt harum
        blanditiis molestiae, dolore ratione porro recusandae explicabo, sit
        velit expedita similique nam distinctio officia. Natus animi, possimus
        rerum dignissimos excepturi saepe id cumque officia nisi labore rem
        dicta voluptatem, optio dolores incidunt consequatur a quod aut eveniet
        alias odio necessitatibus ea earum. Eos, nemo! Dicta vero ea numquam
        molestiae id dolore, quibusdam sequi, vitae voluptas necessitatibus
        nemo, atque veniam fugiat voluptatibus asperiores! Possimus laborum
        quasi illo ex laudantium, similique temporibus maxime magni voluptatem
        recusandae! Quis nesciunt doloribus et unde ea aut eligendi laborum
        numquam, nam incidunt suscipit consequatur error dolore minima aliquid
        quaerat obcaecati necessitatibus placeat ut sapiente tenetur
        exercitationem. Animi consequuntur enim ipsam. Esse, sed. Voluptatem ad
        fugit nam tempora natus doloribus maxime, voluptates unde reiciendis
        facere culpa hic ipsam in dolorem quis libero ea esse neque sapiente
        aliquam veritatis illum quam ex? Nemo corrupti fugiat, ullam natus
        mollitia quaerat deserunt possimus at officiis temporibus? Laudantium
        ipsa quos aut cum repellendus quasi minima, odio facilis non laborum
        assumenda rem odit ullam, neque deleniti. Nulla nemo distinctio
        provident est ipsum? Culpa quos laborum placeat quisquam et rem
        aspernatur optio mollitia, labore autem recusandae aut vero ipsam
        voluptatibus! Culpa possimus cumque est impedit aliquam distinctio.
        Ullam voluptates earum harum blanditiis accusantium velit distinctio
        sapiente, reprehenderit incidunt praesentium impedit temporibus corrupti
        odio tempora totam ipsum nisi. Fugiat labore cum esse atque sit pariatur
        dicta hic a. Voluptate recusandae dolor corporis nostrum quo maxime
        expedita, illo explicabo? Eos laborum voluptas non maxime perspiciatis
        enim veniam itaque reiciendis? Illo sunt velit atque ipsa labore
        doloremque commodi quod tempora? Eum nesciunt deserunt debitis harum,
        consequuntur quae neque eligendi qui est voluptas modi iure cum
        dignissimos, maxime recusandae sunt possimus inventore! Laudantium
        inventore modi fugiat? Quibusdam sunt accusantium voluptatem dolorum?
        Tempora laboriosam eum cum provident ipsam nesciunt nihil nisi ratione
        rerum temporibus tenetur dignissimos, earum necessitatibus omnis
        adipisci quae delectus quidem odit cumque minima ex pariatur magni?
        Tenetur, quasi quas! Aliquid excepturi mollitia itaque, eaque
        voluptatibus iste, obcaecati, sint amet aperiam quisquam cupiditate
        libero corporis commodi numquam odit ratione tempore beatae sapiente!
        Vitae consectetur fugiat ipsa hic, ducimus velit aliquid. Ipsam, facilis
        incidunt quia officia amet suscipit numquam in? Saepe quos vel
        voluptates laborum officia necessitatibus amet, reprehenderit,
        repudiandae nulla maxime nihil ab, architecto mollitia molestias
        perspiciatis illo assumenda iusto. A placeat incidunt enim est,
        distinctio reprehenderit dolor quisquam, natus voluptas quo atque beatae
        ab quae ducimus dolorum saepe impedit corrupti libero fugit? Omnis
        molestiae consequuntur illo libero aliquid. Ex. Tempora culpa voluptates
        quis expedita numquam. Harum rerum omnis ex. Error, nobis quo nesciunt
        consequuntur cum soluta ipsa! Facilis inventore culpa optio atque
        maxime, perspiciatis nihil sit! Magni, ex saepe. Ipsum libero deserunt
        aliquam non dicta et officia itaque. Aliquam cupiditate quae blanditiis?
        Doloribus fugiat aspernatur reiciendis, soluta inventore sint animi
        repellat asperiores debitis provident odio, molestiae at quisquam unde.
        Animi, repellat aliquam. Sunt, sint molestiae? Corrupti, modi quibusdam.
        Soluta animi recusandae inventore, commodi non in nisi laboriosam
        quibusdam voluptatem consectetur doloremque quae dolor rerum expedita
        illo dolorem obcaecati? Error. Repellat voluptate corrupti deserunt
        fugiat ducimus reiciendis, nemo nostrum facere quam ipsa magnam modi,
        dolor, nam doloribus! Ullam, ipsum? Ex, dolorem reprehenderit. Eaque
        porro aliquam earum facere. Harum, dolorem exercitationem. Suscipit nisi
        corporis sequi corrupti ipsa vel sunt beatae, harum nam labore iure
        explicabo? Iste earum nostrum sed odit enim veritatis sapiente a nihil
        quidem deserunt aliquam ducimus, quod voluptatum. Aliquam tenetur ut
        exercitationem fugit illum eum, modi tempore iusto laudantium amet
        deleniti maiores itaque iste quam harum ab ipsa quibusdam expedita in ea
        sunt. Ex aspernatur debitis reiciendis nam? Minus nam dolor nisi
        pariatur, iusto magni totam impedit id assumenda, aliquid beatae nulla
        vel rem architecto, obcaecati ad fuga ullam! Sit, dolores similique
        repellendus nobis iste debitis illo a. Fugiat accusamus, enim voluptas
        beatae ab quos quidem, tempora inventore eos doloribus fugit veritatis
        illo dolorum voluptates suscipit minima ullam sint perferendis quod
        provident possimus nam itaque dolore! Provident, quia? Sed voluptates
        minima a magnam accusamus placeat nisi consequatur temporibus enim non,
        eveniet soluta dolorum deleniti voluptatibus iste aperiam nulla ut minus
        blanditiis sit exercitationem fugiat veniam debitis quasi? Sed. Aliquid,
        nesciunt reprehenderit? Repudiandae velit cupiditate, culpa corrupti
        reprehenderit, consequuntur iure facere voluptates, tenetur numquam
        quidem. Totam sequi, et praesentium voluptate consequatur nisi fugiat
        deleniti. Exercitationem est porro aperiam mollitia! Quidem quo libero
        voluptas! Assumenda ad ipsam ipsa officia fugiat autem? Voluptate
        aliquid officiis quas error. Deserunt, fugit, excepturi quia officiis
        cum, quasi non similique recusandae aperiam porro debitis modi.
        Molestiae quis velit odio ut! Facere debitis laboriosam aperiam ex
        necessitatibus reiciendis facilis delectus rerum commodi ad provident,
        doloribus, in enim nostrum perferendis natus vero aut. Enim praesentium
        error eligendi. Molestias voluptates, quae omnis voluptate quia modi qui
        beatae. Delectus officiis est dolorum optio nostrum dolorem possimus
        saepe deserunt eveniet voluptate, sint aut quos enim, expedita rem
        facere, laboriosam velit! Dolorem, quam sit illo atque earum nisi enim
        incidunt architecto soluta veniam corporis libero maiores! Quam itaque
        eveniet nobis aliquam. Quod omnis repudiandae culpa minima quae, dolorum
        sit! Incidunt, autem? Maiores illum corporis quae fuga ratione nisi
        dolor quos laudantium explicabo sequi, numquam laboriosam accusamus
        nihil vel quis adipisci eligendi minus enim cumque? Tempora laborum,
        provident vero illo ut accusamus. Eaque fugiat quas natus porro
        consequatur eos impedit neque aut doloribus autem tenetur, quibusdam
        mollitia, officia soluta ex aliquam provident! Minima nobis enim magni
        quia itaque quidem iusto qui fugit! Amet autem, exercitationem molestiae
        quisquam temporibus at placeat veritatis consequuntur nisi atque impedit
        dolor minus explicabo in debitis quia ea facilis similique minima
        voluptatum alias consequatur vero doloremque? Hic, optio. Quasi tenetur
        excepturi at odit eaque esse eius, numquam repellendus dolorem possimus
        sequi ex autem rerum ullam nisi. Iste consectetur tempora culpa
        assumenda dolorem autem deleniti quos, molestiae minima quidem? Ipsa
        earum nulla eaque similique, ducimus, nesciunt rerum, velit iusto minima
        itaque veritatis? Quidem unde vero sed aperiam suscipit illum nam
        doloribus maxime mollitia eius? Corporis suscipit earum error dolorum.
        Consectetur cupiditate perferendis natus dolorem optio incidunt ut
        tempora facere quas expedita? Quis voluptatibus ad dolores, dolore
        mollitia libero, eveniet hic modi assumenda laboriosam fugit impedit
        perspiciatis reprehenderit quam neque. Quidem suscipit iusto quae
        ratione reprehenderit? Impedit, expedita. Corrupti, ullam! Officia alias
        deserunt laudantium, dolor architecto consequatur placeat, facere unde
        laboriosam, veniam vero. Explicabo, neque quibusdam perferendis nobis
        tempore voluptatum? Facere culpa consequatur rem quasi ea obcaecati,
        corrupti doloremque sint animi perspiciatis error quidem saepe?
        Architecto et fuga voluptatum officiis aspernatur magni voluptatem
        delectus. Distinctio ex vitae veniam dicta odio. Dignissimos
        consequuntur fuga deserunt dolorum dolore possimus quae eos consequatur
        quasi? Quibusdam neque animi ipsam ea ratione provident repellendus
        accusantium, distinctio error illo qui deleniti rem, possimus hic quidem
        totam. Iure fugiat est eos repellendus unde! Alias sequi totam, sit
        quisquam eum consectetur explicabo neque id porro. Cumque, impedit
        blanditiis. Quis rerum dolorem modi ad facere! Deserunt error eos
        quisquam?
      </p>
    </div>
  );
};

export default Note;
