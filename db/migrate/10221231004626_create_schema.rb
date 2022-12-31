class CreateSchema < ActiveRecord::Migration[7.0]
  def change
    ActiveRecord::Base.connection.create_schema('ultimate_notakto')
  end
end
