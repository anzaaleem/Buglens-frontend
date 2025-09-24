// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-about',
//   imports: [],
//   templateUrl: './about.component.html',
//   styleUrl: './about.component.scss'
// })
// export class AboutComponent {

// }


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  userProfile: any;

  ngOnInit(): void {
    // 🚨 Real-world type bug: assuming API gave userProfile, but it's null
    this.userProfile = null;

    // ❌ Trying to access property of null → runtime error
    console.log(this.userProfile.name.toUpperCase());
  }
}
