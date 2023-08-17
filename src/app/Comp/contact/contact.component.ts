import { Component } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
export function ValidateEmail(mail?:string) 
{
  if(!mail){
    return false
  }
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private data:DataService){}
  Contact:Contact = new Contact()
  sent?:boolean
  emailMsg?:string
  fnMsg?:string
  lnMsg?:string
  noteMsg?:string

  
  sendBI(){
    if(
      ValidateEmail(this.Contact.email) != undefined
      &&  this.Contact.fn != undefined 
      &&  this.Contact.ln != undefined 
    ){
      this.data.setContact(this.Contact)
      const s = this.data.__sendBI()?.subscribe(x=>{
        console.log(x)
      }, error=>{
        console.log(error)

      })
      if(s){
        setTimeout(()=>{
          s.unsubscribe()
        })
      }
    }else{
      if(!ValidateEmail(this.Contact.email)){
        this.emailMsg = "Your email is not valid"
        setTimeout(()=>{
          this.emailMsg = undefined
        }, 3000)
      }
      if(!this.Contact.fn){
        this.fnMsg = "A first name is needed "
        setTimeout(()=>{
          this.fnMsg = undefined
        }, 2999)
      }
      if(!this.Contact.ln){
        this.lnMsg = "A last name is needed as well"
        setTimeout(()=>{
          this.lnMsg = undefined
        }, 2998)
      }
    }
  }
  
  sendGI(){
    
  }
  
}

export class Contact{
  email?:string
  fn?:string
  ln?:string
  note?:string
}