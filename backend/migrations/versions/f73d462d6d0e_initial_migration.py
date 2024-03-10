"""initial migration

Revision ID: f73d462d6d0e
Revises: 
Create Date: 2024-02-27 16:14:04.076284

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f73d462d6d0e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('user_api', sa.String(length=500), nullable=False),
    sa.Column('user_risk_cap', sa.String(length=50), nullable=True),
    sa.Column('user_market_cap', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_market_cap'),
    sa.UniqueConstraint('user_risk_cap'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###
