import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { Button, Box, Typography } from "senf-atomic-design-system";
import { db } from "../firebase";

const InviteMember = () => {
  const invitationLink = "http://localhost:3032/invitation/xyz";
  const heading = "You have been invited to join the Organization X";
  const image =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEBAVEBAVEBIbDRUVDRsQEA4SIB0iIiAdHx8kKDQsJCYxJx8fLTstMT03MDAwIys9REcuNzQ5Q0ABCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAABAAIDBAUHBgj/xAA5EAABAwIEBAQDBwQCAwEAAAABAAIRAwQFEiExBkFRYQcTInEygZEUI0KhscHRUmLh8HKSQ0SCJP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDr0IwjCUIAkikgEJIpIGpIpIAgnIIAkilCAIQnQggbCUJ0IQgEIQnIQgbCEJ8IQgbCEJ8IQgZCEJ8IQgYQknQgguJIpIAkikgCSKCAJJJIAkkSvPY/xfa2gcDUFSsPhptMuJ79EHoHOA3UZuG7AyVxbFuM8QqvzisKLAZFNoAbHcnUrRwrxLy+m4DCANYfJP5oOp3d62mxz3bASdVRbjGUg1DTLDuWP1onoRzHcfRcW4j4+qXGdvmFtMA5Wt3OumqwbfGqmjiHOPUv1QfTjXg6gyiuB4B4h3FsQ0Ne+nPwu9bQOx5LrvC/FdvfN9DslUD103GHjuOoQb6SQRQNhKEUkDYShOhBA1AhOhCEDUkSEUFlFFAoAUCiUEAKBRQQBQXl5TotL6jg1oHNZnF+OixtjVDS+o5wbQaPxPO3yXz9j/Ed3dVH+c5xOxGf0t7QNEHu+M/EB1YupW1Q06WxcPjqfwF4I3MzBJPM6CVlU7F7/ic1o6QVdp4YB+L5oLJObcF3bPA/VQvp0NqlKO8k/nKlbYt/r/dVLyyEQKjiegifoggxHB25TUpbAa6zp3Wbh9YsdlMDqSrmE3ppVMuclpMOBER3Ud/DKmYAFv8AxQaLqrC0kPJ9nFR2uJ1KTg6lUc1wMt9cx/Ct29cOZObKO/dZl5UbMObJ7gIO5eH3Hrbtoo3BArDQO2ze/wDK6CvkiyvxTeHMJY4EEEOX0T4e8TtvbduZw8xsCppGvI/P9UHrkkUkAQTkEDYQToSQNSRSQWUCnIFA0oIlAoAmPcACSYA3J5J689x1VAsLkEkO8olsGHaIOa+K3GLKxbQoCWMJJednu7e3VcvN647bdToPoN1oY6HOFNxeajYGQab9O5UeH2LHAvf6yNGtB9Jd0/lBWt67iRqfkIC1ftFNmriXEcgMzlVuaYnUknaGaBntoo6NlHqpuL5HMQ9p7FBNdY0+IY0t/wDqT+izy+tWElpcJ3jUFekwvhmtVqMcW+Y0xMCF0/CuB6YptzNyu/M+6DjuEYJXfUaXUy4aSY1XtRwnTyuMROwLSQ1dJtsBZT7md4ClrWbN4/yg+ecXwirQqEHUZpHRQXbHFgmHf70XWuL8JBDo1EyB0XMsXovHp5Dkg84KesQBqu1+CVqMtxL/AFwBkg6DcOE91xV5II0XTPCDiVtC48l1MEVi1vmZvUzp8ig7zTfIB6hOUdM6AJ8oCkhKUoEklKCBJJIILSBTimlA0oFEoFA0lcg8UeKrR+ek1xfUaIaQCAwzrJ5jbTsuvOE6L5n48wp9K8rtHwNedSMwynUIPO1aug1Je4wzk1jeZAWphYhpYzV05W/ufr+ixHO1c88gAO3JanClTNcU2nWXHT5oOncKcCUyGvrCXkTGmi91b8LWbYIotBA3ASwNvpB7ABbVJBBa4ZRpD7tgbryVpzU4BOhBUqMVWoFfqqm9qDz+O22ZhMbLkXFFENJ5Qfou5XNKQQdjuvD8X8Miq3M0SY2QcTeZO08gvR8JXrrevSe0u0cMwZGeOyxr6zdSqOYdCCR0XsfD+2cyqxwpB5doCXQ1soPoCzADGxMFoOp9XzU8qKjOVoO+USnygdKUpspIHJSmooDKSCSC4gU5AoIymlPITSgY/YwuB+LFv/8AscWEmWgugGGu5/Nd9K8d4i8OsurZ72sJrNjIWj1Ecwg+ba1MmGNk6+onQStPhCiftTIMw7knusHB5aRBmN/hHMrb8LGU6uIEFujWONOd5ndB3PD2xTYOeULRpg81hV8QdRhrGF7ugHJEY7cj/wBN5HYoPRtCJCzrHFQ/dpY7mCrr6uiA1CGiSYC8/eY6HEsoMNQzEx6VoXziRB0CyH3lVlOo61tfOFP44dB31gcyN4QDJcQS53PaE+mMw1WNRvsQuGvqBlNgFSGNcx7HOZ15rbw1r4+8EH3Qcy8UeHwALlgjk+AmeHNIl1N5cD/T6ROYc10PiaxbWo1KbhIc05fdeK8OsLew1HGQ1hcWzsDsQg7Mx0gEcwCkmW7YYwdGt/RPQFIJBFAkUkkCSSRQXU0pyBQMKaU8ppQRlAhOKaUHHuPODq1O6dcUaZqUHh2YDU0nHfTovFeHYNHFmN2BLx+q+liJ0XKOMeEfsl3Sv7cHJ5s1R/RrJ+W6D2dy7ygakTpyElZz8avzTD6VoMvmAFrnE1sn9QboPzW3ScHtadwYKtU6Pugwrdt29lN1VrBULjnaGlhptnQzJnTktqzkHK7Uq0yi1uvNV2n1II7seoCNEqNowD0AN1JMdTun3LToUy0rAmJg90Ehtvmq1ahEnZaZYqlwN0GHfHRQ4RRl4ptAAL8z9OW6nvdZT+F7IGpVrkkuADGjk0bn5nT6BB6VNTimoCiEAiEBRSSQJJJJBdQKKBQAphTimlAwoJxQKAKC/oh9N7XDMMp0U6SDy+A3za1Jrg0sglrmuEOY4aQt2gVhXdZrL11ICA+mHg8s40I+hH0WnaXAOh0I3CC/UdAWfQeMwJO5/NPdXBcdQSNxzHuq1a1ZVguZqDodiPmguXz2tEkrOaQ57C0OABlxIhWjhw0JJdEQC6U26r0qc53hvzQW/N7qGu+QVmfbfMP3DS4AwSfQ35dVqeXDZO5QYtVmjiea18AYBRBAgky7us2/OgaN3EBvzXoqNIMaGjYCAgRQTimoEnBBFAUkkkCSSSQXEEkJQIppRQKAFNTimvcBqSAO5QBJeJ4g8SLa3eaVFpuHgw4h2WmD7815/F/FCo6i4UqQpVDs/Pnj2EIPd4/d2luDVuKjaZDSWS71k9huVXw65p12U69Igtc0EEdFwate1bk1a9d7qlR2jSTsF77wqu3ttHgeoMrOBb/aQDp9UHThRa4EgQSNVkXWH12xFw+Owb/CntMSa7Y+/ULTY8HugyaVo/KA6vUPX1DX6BOZhbDs2TzJ1P1K2WgdAnAQEFKhbBmgEKC4q6kclcrOjVePxjESXmnTMuJ1P9IQHE7wuc4sMZAS0/3BW/Dfi8Ynay+Bc09LgDSejgOhVRlrlpEf2lce4Ex2rh11UcwA/E17T8Lxy/RB9MlBeEwbxPtKoiu11B/P8bF7GwxGjXaH0ajajezpQWkkEUBCKARQJJJJBZlKU2Vk41xHa2Y++qAO5NGrz8kGvKyeI8fo2NI1Kp1/8bB8TyvE4n4ojUW9Idi50/kP5XPOIsZq3Ts9V5c78gOwQbeJcf39y85ankU5+Fmhj33WLdcQV3yPMe4c81Qun81k2+xCiqSHIFUcQ6eRSqPkA7/spLdkkzHaUyu0NJjXTXogcwFjQDtJXvfCauM9xRP4gxzf0P7LwTnT6T0W1wZiIt7ui8mBmyv9ig63iuDE+ukcr+2x91Sw/GqtF2S4aQOTgJavWU4I+Sp3Nm0mSEAbjNGJ8xv/AGVatxJT2YHVD/a0kfVWaGH0ebGz/wAVfZbU2iQ0D5IPPV7+vUBDaZpg83fwqdnh4aZOpO55krfuqg1hV7enJlBTvm5aTj0aVwK8phtaoe4/Rd64iqBtF+uuUrguKPlznA/E8/qgjokS7WNZV2xxetQcHU3ua4HQtdlKzKA1JUrUHSMB8T7hhDbgCs3ST8FQfsV0TBeLbO7gU6oa8/gd6Xf5XzsHgRI1T2ViCCDGqD6klKVw7hnxCuraGVD59Lo53qb7OXU+HeLLW+H3T4qR6qbtHj+UG/KSbKSDyfHPGrbRpoUCHXJ0J3FHue/ZcavLx9V7nOcXuJ9TnOkuKQucxcSSXE6k7lVTpMIJA5McDrPLdJnQ/wCSi58yO31QRARMnX3gKSo8EQBPTRENBHeFVLix0O2jSUFg7Tz5qC6nO0dYVg/CehKguhFSkgk8snUb5T+qY2qQQY3305qy3QQdp0PRV7qkdxqDr80HcfD7HftNs0OP3jNHTzXqXhcC4Vx19rVbUBOWIeJgEfyu1YRi9O5phzHAyEFss6FQVH1T6RAHVT1QeSrOrP8A9CBldsCCVIwhrVAWkmXGUys8nsAg85xveZLaq/o0gdydFxi/MBjefPqug+IWNNcfs7ILWkeaeWbkFzeq/O8lBNQGkpNdH1SadED8QPVBI4c0wjRTCn9EH0ygia7nt7KSjdPY4OaS1wMgg5SmDRNeUHVeDPE0Q2jfSeTawE/9h+6S5NOqSC8Hz2MbJVHkiBsBvzKY6nzU1odSD0+qBrD6gW7QpGj1FV3el+U/CT6VPn1PSUDaT9deqfeUs4j8QEjuoJU5cQ0O6b+yAWjszSDuCmYgINI9CntbD84EtO/ZMxUjKOocgtMcIUVQxtqEqbtFJvsgr0xBAEx/ui2sHx19rVpljiXF3qAOj2cyR2TeHa1vTuqTrqn5lvm+9bE8tDHYws7HLmm2/qV7Eup02uihrDmD+N0HdcEx6jdN9LwXfiGzh7haZpSvnmpi9TzBWa7I/qxgpweukars3hvjbru1BqOzVGOLah5nofog3XW+68ZxvxILZnk0iDXdtzyDqVtcf8Rixoegg1nA+WDyHMnsuE3N9WuHOe+oSXHUxBI56oFXu31ftENL2sIzVIkSdCSfdUaDdJV2hiVZltUtGOy0H1Aajco9ZHff5Kq7YeyB42MplUEtBTo0T2NliCW0qSpid9FSoDXRXHOQQ1Aq7lZfqoKjYQQlFJJBeSd1G6SSCO59TA4bg6ptOpIRSQGf0VigZaQeaSSAW1SCWz7JmIslpSSQOtnS0ewTpSSQEv5qtIDnA8xISSQew4Jx7D7SnWN1a+fUdHlnI18CNoO3urPBHFlCyde1HjIx/qo0x1kw0fX8kEkHmcbxqtfVnVqxDQfhaNmt5BULh4aNInLGiCSCsGwAOyFUQAkkgmpDSeyfbM9LkkkEVHcqd/RBJBGHy6BsE6oUkkFV2kpJJIP/2Q==";
  const button = "Accept invitation";

  const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
        <body style="font-family:nunito;font-size:28px">
        <div style="width: 100%; height: 100%; background-color:#fed957">
        <h1 >${heading}</h1>
      
        <button  onclick={() =>
          window.open(${invitationLink}, "_blank")
        }>${button}</button>
        </body>
        </html>
`;
  // <img src=${image} alt="HTML tutorial" style="width:400px;height:auto;border:0">

  const handleSendInvite = async () => {
    const data = {
      to: "tassilomorino@gmail.com",
      message: {
        subject: "Invitation to join Organization X",
        text: "This is the plaintext section of the email body.",
        html: htmlTemplate,
      },
      createdAt: new Date().toISOString(),
    };
    await addDoc(collection(db, "mail"), data).then(() =>
      console.log("Queued email for delivery!")
    );
  };

  return (
    <div>
      InviteMember
      <Button text="send invite" onClick={handleSendInvite} />
    </div>
  );
};

export default InviteMember;
