# require "awesome_print"
# require "json"
class ApplicationController < ActionController::Base
 
    def getdata
        

      my_json = [{"ch":"checked","name":"Tord","email":"tord@gmail.com"},{"ch":"","name":"Tome","email":"tome@gmail.com"},{"ch":"","name":"Tony","email":"Tony@gmail.com"},{"ch":"","name":"Jemy","email":"jemy@gmail.com"},{"ch":"","name":"Mery","email":"Mery@gmail.com"}]
        # cars = [{type: 'porsche', color: 'red'}]
        render json: my_json
      end
end
