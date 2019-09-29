# require "awesome_print"
# require "json"
class ApplicationController < ActionController::Base
 
    def getdata
        

      my_json = [{"ch":"checked","name":"Tord","email":"tord@gmail.com","phone":"+1 073 2714 007","country":"USA","ltv":"$50","ip_add":"12312323232","time":"1 hr"},
                {"ch":"","name":"Tome","email":"tome@gmail.com","phone":"+1 073 4444 007","country":"AUS","ltv":"$20","ip_add":"333333333333","time":"2 hr"},
                {"ch":"","name":"Tony","email":"Tony@gmail.com","phone":"+1 073 5555 333","country":"IND","ltv":"$30","ip_add":"4444444444","time":"3 hr"},
                {"ch":"","name":"Jemy","email":"jemy@gmail.com","phone":"+1 555 2714 007","country":"PAK","ltv":"$80","ip_add":"6666666","time":"1 hr"},
                {"ch":"","name":"Mery","email":"Mery@gmail.com","phone":"+1 073 2714 234234","country":"GEM","ltv":"$40","ip_add":"55555555555","time":"1.5 hr"}]
        # cars = [{type: 'porsche', color: 'red'}]
        render json: my_json
      end
end
