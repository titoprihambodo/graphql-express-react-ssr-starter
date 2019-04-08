import Post from './models/post';
import chalk from 'chalk';

export default async () => {
  await Post.countDocuments().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const text1 = 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire';

    const text2 = 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek';

    const text3 = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.';

    const post1 = new Post({
      title: 'Cicero (en)',
      content: text1,
      slug: 'cicero-dummy',
      meta: {
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        keywords: 'lorem, ipsum, dolor, sir',
      },
      createdAt: new Date("2019-01-01T12:00:00Z"),
      updatedAt: Date.now(),
    });
    const post2 = new Post({
      title: 'Far far away',
      content: text2,
      slug: 'far-far-away-dummy',
      meta: {
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        keywords: 'lorem, ipsum, dolor, sir',
      },
      createdAt: new Date("2019-01-02T12:00:00Z"),
      updatedAt: Date.now(),
    });
    const post3 = new Post({
      title: 'Where can I get some?',
      content: text3,
      slug: 'where-can-i-get-some',
      meta: {
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        keywords: 'lorem, ipsum, dolor, sir',
      },
      createdAt: new Date("2019-01-03T12:00:00Z"),
      updatedAt: Date.now(),
    });
    const post4 = new Post({
      title: 'New Dummy Post 1',
      content: text1,
      slug: 'new-post-1',
      meta: {
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        keywords: 'lorem, ipsum, dolor, sir',
      },
      createdAt: new Date("2019-01-04T12:00:00Z"),
      updatedAt: Date.now(),
    });
    const post5 = new Post({
      title: 'New Dummy Post 2',
      content: text2,
      slug: 'new-post-2',
      meta: {
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        keywords: 'lorem, ipsum, dolor, sir',
      },
      createdAt: new Date("2019-01-05T12:00:00Z"),
      updatedAt: Date.now(),
    });
    const post6 = new Post({
      title: 'New Dummy Post 3',
      content: text3,
      slug: 'new-post-3',
      meta: {
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        keywords: 'lorem, ipsum, dolor, sir',
      },
      createdAt: new Date("2019-01-06T12:00:00Z"),
      updatedAt: Date.now(),
    });
    const post7 = new Post({
      title: 'New Dummy Post 4',
      content: text1,
      slug: 'new-post-4',
      meta: {
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
        keywords: 'lorem, ipsum, dolor, sir',
      },
      createdAt: new Date("2019-01-07T12:00:00Z"),
      updatedAt: Date.now(),
    });

    Post.create([post1, post2, post3, post4, post5, post6, post7], (err) => {
      if (!err) {
        console.log(
          chalk.green(`-> Post data (dummies), inserted to DB! <-`)
        )
      } else {
        console.log(
          chalk.red(`-> Post collection seems empty, but failed on inserting dummy to db. <- \n`)
        )
        console.log('​dummy -> err', err)
      }
    })
  });
}